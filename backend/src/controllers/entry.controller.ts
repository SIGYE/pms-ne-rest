
import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import prisma from '../../prisma/prisma-client';
import { CreateEntryDTO } from '../dtos/entry.dto';

export const createEntry = async (req: Request, res: Response) => {
  const dto = plainToInstance(CreateEntryDTO, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    // 1. Find vehicle by plate number
    const vehicle = await prisma.vehicle.findUnique({
      where: { plateNumber: dto.plateNumber },
    });

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle with this plate number not found' });
    }

    // 2. Find parking by code and get an available slot
    const parking = await prisma.parking.findUnique({
      where: { code: dto.parkingCode },
      include: {
        slots: {
          where: { isAvailable: true },
          take: 1,
        },
      },
    });

    if (!parking || parking.slots.length === 0) {
      return res.status(404).json({ message: 'No available slots for this parking code' });
    }

    const slot = parking.slots[0];

    // 3. Calculate charged amount if both entry and exit times are provided
    let chargedAmount = 0;
    if (dto.entryTime && dto.exitTime) {
      const entry = new Date(dto.entryTime).getTime();
      const exit = new Date(dto.exitTime).getTime();

      if (exit < entry) {
        return res.status(400).json({ message: 'Exit time must be after entry time' });
      }

      const hours = Math.ceil((exit - entry) / (1000 * 60 * 60)); // convert ms to hours
      chargedAmount = hours * parking.feePerHour;
    }

    // 4. Create entry
    const entry = await prisma.entry.create({
      data: {
        vehicleId: vehicle.id,
        slotId: slot.id,
        entryTime: dto.entryTime,
        exitTime: dto.exitTime ?? null,
        chargedAmount,
      },
      include: {
        vehicle: true,
        slot: true,
      },
    });

    // 5. Mark the slot as unavailable
    await prisma.parkingSlot.update({
      where: { id: slot.id },
      data: { isAvailable: false },
    });

    return res.status(201).json({ message: 'Entry registered successfully', entry });
  } catch (error) {
    console.error('Error registering entry:', error);
    return res.status(500).json({ message: 'Failed to register entry', error });
  }
};