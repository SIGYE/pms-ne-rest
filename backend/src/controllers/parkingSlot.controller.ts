import { Request, Response } from "express";
import prisma from "../../prisma/prisma-client";
import ServerResponse from "../utils/ServerResponse";


//get all parking slots
export const getAllParkingSlots = async (req: Request, res: Response) => {
  try {
    const parkingSlots = await prisma.parkingSlot.findMany();
    return ServerResponse.success(res, "Parking slots fetched successfully", parkingSlots);
  } catch (error) {
    console.error("Error fetching parking slots:", error);
    return ServerResponse.error(res, "Failed to fetch parking slots");
  }
};

//get available parking slots
export const getAvailableParkingSlots = async (req: Request, res: Response) =>{
  try{
    const availableParkingSlots = await prisma.parkingSlot.findMany({
      where:{
        isAvailable: true,
      }
    });
    if (availableParkingSlots.length === 0) {
      return ServerResponse.error(res, "No available parking slots found");
    }else{
      return ServerResponse.success(res, "Available parking slots fetched successfully", availableParkingSlots);
    }
  }catch (error) {
    console.error("Error fetching available parking slots:", error);
    return ServerResponse.error(res, "Failed to fetch available parking slots");
  }
}

export const getParkingSlotById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parkingSlot = await prisma.parkingSlot.findUnique({
      where: { id },
    });
    if (!parkingSlot) {
      return ServerResponse.error(res, "Parking slot not found");
    }
    return ServerResponse.success(res, "Parking slot fetched successfully", parkingSlot);
  } catch (error) {
    console.error("Error fetching parking slot:", error);
    return ServerResponse.error(res, "Failed to fetch parking slot");
  }
};

export const createParkingSlot = async (req: Request, res: Response) => {
  try {
    const { slotNumber, isAvailable } = req.body;
    const existingSlot = await prisma.parkingSlot.findUnique({
      where: { slotNumber },
    });

    //check if slot number already exists
    if (existingSlot) {
      return ServerResponse.error(res, "Slot number already exists");
    }
    //create new parking slot
    const newParkingSlot = await prisma.parkingSlot.create({
      data: {
        slotNumber,
        isAvailable: isAvailable !== undefined ? isAvailable : true,
      },
    });
    return ServerResponse.created(res, "Parking slot created successfully", newParkingSlot);
  } catch (error) {
    console.error("Error creating parking slot:", error);
    return ServerResponse.error(res, "Failed to create parking slot");
  }
};

/// Update parking slot
export const updateParkingSlot = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { slotNumber, isAvailable } = req.body;
    const parkingSlot = await prisma.parkingSlot.findUnique({
      where: { id },
    });
    if (!parkingSlot) {
      return ServerResponse.error(res, "Parking slot not found");
    }
    if (slotNumber && slotNumber !== parkingSlot.slotNumber) {
      const existingSlot = await prisma.parkingSlot.findUnique({
        where: { slotNumber },
      });
      if (existingSlot) {
        return ServerResponse.error(res, "Slot number already exists");
      }
    }
    const updatedParkingSlot = await prisma.parkingSlot.update({
      where: { id },
      data: {
        slotNumber: slotNumber !== undefined ? slotNumber : parkingSlot.slotNumber,
        isAvailable: isAvailable !== undefined ? isAvailable : parkingSlot.isAvailable,
      },
    });
    return ServerResponse.success(res, "Parking slot updated successfully", updatedParkingSlot);
  } catch (error) {
    console.error("Error updating parking slot:", error);
    return ServerResponse.error(res, "Failed to update parking slot");
  }
};

/// Delete parking slot
export const deleteParkingSlot = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parkingSlot = await prisma.parkingSlot.findUnique({
      where: { id },
    });
    if (!parkingSlot) {
      return ServerResponse.error(res, "Parking slot not found");
    }
    await prisma.parkingSlot.delete({
      where: { id },
    });
    return ServerResponse.success(res, "Parking slot deleted successfully");
  } catch (error) {
    console.error("Error deleting parking slot:", error);
    return ServerResponse.error(res, "Failed to delete parking slot");
  }
};
