import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import prisma from "../../prisma/prisma-client";
import { CreateParkingDTO, UpdateParkingDTO } from "../dtos/parkingSession.dto";

export const createParking = async (req: Request, res: Response) => {
  const dto = plainToInstance(CreateParkingDTO, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const parking = await prisma.parking.create({
      data: {
        name: dto.name,
        location: dto.location,
        code: dto.code,
        feePerHour: dto.feePerHour,
        slots: {
          create: dto.slots.map((slot) => ({
            slotNumber: slot.slotNumber,
            isAvailable: slot.isAvailable ?? true, // default to true
          })),
        },
      },
      include: { slots: true },
    });

    return res.status(201).json(parking);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create parking", error });
  }
};

export const updateParking = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dto = plainToInstance(UpdateParkingDTO, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const existing = await prisma.parking.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "Parking not found" });
    }

    const updated = await prisma.parking.update({
      where: { id },
      data: {
        ...dto,
      },
    });

    return res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update parking", error });
  }
};

export const deleteParking = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existing = await prisma.parking.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "Parking not found" });
    }

    // Optional: Delete slots first if cascading is not set
    await prisma.parkingSlot.deleteMany({ where: { parkingId: id } });

    await prisma.parking.delete({ where: { id } });

    return res.status(200).json({ message: "Parking deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete parking", error });
  }
};

// Get all parkings with optional search
export const getAllParkings = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    let where = {};
    if (search && typeof search === "string") {
      where = {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { location: { contains: search, mode: "insensitive" } },
          { code: { contains: search, mode: "insensitive" } },
        ],
      };
    }

    const parkings = await prisma.parking.findMany({
      where,
      include: { slots: true },
    });

    return res.status(200).json(parkings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch parkings", error });
  }
};

export const getParkingById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const parking = await prisma.parking.findUnique({
      where: { id },
      include: { slots: true }, // include slots data as well
    });

    if (!parking) {
      return res.status(404).json({ message: "Parking not found" });
    }

    return res.status(200).json(parking);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch parking", error });
  }
};


