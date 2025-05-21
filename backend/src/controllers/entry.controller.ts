import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createCarEntry = async (req: Request, res: Response) => {
  try {
    const {
      plateNumber,
      parkingCode,
      userId,
      parkingSlotId,
      vehicleId,
    } = req.body;

    // Check if slot is available
    const slot = await prisma.parkingSlot.findUnique({
      where: { id: parkingSlotId },
      include: { parking: true }, // include parking to get parkingId for ticket
    });

    if (!slot || !slot.isAvailable) {
      return res.status(400).json({ message: 'Slot not available or does not exist' });
    }

    // Mark slot as unavailable
    await prisma.parkingSlot.update({
      where: { id: parkingSlotId },
      data: { isAvailable: false },
    });

    // Create car entry
    const newEntry = await prisma.carEntry.create({
      data: {
        plateNumber,
        parkingCode,
        userId,
        parkingSlotId,
        vehicleId,
      },
    });

    // Create ticket associated with this car entry
    const amount = slot.parking.feePerHour; 
    const ticket = await prisma.ticket.create({
      data: {
        userId,
        parkingId: slot.parking.id,  // parkingId from included parking relation
        amount,
        carEntryId: newEntry.id,
      },
    });

    res.status(201).json({ newEntry, ticket });  // return both car entry and ticket
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create car entry and ticket' });
  }
};



export const getAllCarEntries = async (req: Request, res: Response) => {
  try {
    const entries = await prisma.carEntry.findMany({
      include: {
        user: true,
        vehicle: true,
        parkingSlot: true,
        tickets: true,
        bills: true,
      },
    });

    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch car entries' });
  }
};

export const getCarEntryById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const entry = await prisma.carEntry.findUnique({
      where: { id },
      include: {
        user: true,
        vehicle: true,
        parkingSlot: true,
        tickets: true,
        bills: true,
      },
    });

    if (!entry) {
      return res.status(404).json({ message: 'Car entry not found' });
    }

    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch car entry' });
  }
};

export const updateCarExit = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { exitDateTime, chargedAmount } = req.body;

    const updatedEntry = await prisma.carEntry.update({
      where: { id },
      data: {
        exitDateTime: new Date(exitDateTime),
        chargedAmount,
      },
    });

    // Free up the slot
    await prisma.parkingSlot.update({
      where: { id: updatedEntry.parkingSlotId },
      data: { isAvailable: true },
    });

    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update car entry with exit info' });
  }
};

export const deleteCarEntry = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const deleted = await prisma.carEntry.delete({
      where: { id },
    });

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete car entry' });
  }
};
