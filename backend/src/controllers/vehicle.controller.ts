import { Request, Response } from "express";
import prisma from "../../prisma/prisma-client";
import { CreateVehicleDTO, UpdateVehicleDTO } from "../dtos/vehicle.dto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { AuthRequest } from "../types";

const createVehicle : any = async (req: AuthRequest, res: Response) => {
    const dto = plainToInstance(CreateVehicleDTO, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    const existingVehicle = await prisma.vehicle.findFirst({
        where: {
            plateNumber: dto.plateNumber,
        },
    });
    if (existingVehicle) {
        return res.status(400).json({ message: "Vehicle with this plate number already exists" });
    }

    try {
        const vehicle = await prisma.vehicle.create({
            data: {
                plateNumber: dto.plateNumber,
                color: dto.color,
                userId: req.user.id,
                status: "PENDING",
            },
        });
        return res.status(201).json(vehicle);
    } catch (error) {
        return res.status(500).json({ message: "Failed to create vehicle", error });
    }
};

const getUserVehicles:any = async (req: AuthRequest , res: Response) => {
    try {
        const vehicles = await prisma.vehicle.findMany({
            where: { userId: req.user.id },
        });
        return res.status(200).json(vehicles);
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch vehicles", error });
    }
};

const getVehicleById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const vehicle = await prisma.vehicle.findUnique({
            where: { id },
        });
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        return res.status(200).json(vehicle);
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch vehicle", error });
    }
};

const updateVehicle = async (req: Request, res: Response) => {
    const { id } = req.params;
    const dto = plainToInstance(UpdateVehicleDTO, req.body);
    const errors = await validate(dto, { skipMissingProperties: true });
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        const vehicle = await prisma.vehicle.update({
            where: { id },
            data: {
                plateNumber: dto.plateNumber,
                color: dto.color,
                status: dto.status,
            },
        });
        return res.status(200).json(vehicle);
    } catch (error) {
        return res.status(500).json({ message: "Failed to update vehicle", error });
    }
};

const deleteVehicle = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.vehicle.delete({
            where: { id },
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete vehicle", error });
    }
};

const vehicleController = {
    createVehicle,
    getUserVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle,
};

export default vehicleController;
