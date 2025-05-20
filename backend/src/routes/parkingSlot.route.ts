import { Router } from "express";
import {
  getAllParkingSlots,
  getParkingSlotById,
  createParkingSlot,
  updateParkingSlot,
  deleteParkingSlot,
  getAvailableParkingSlots,
} from "../controllers/parkingSlot.controller";
import { checkAdmin } from "../middlewares/auth.middleware";
import { validationMiddleware } from "../middlewares/validator.middleware";
import { CreateParkingSlotDto, UpdateParkingSlotDto } from "../dtos/parkingSlot.dto";

const parkingSlotRouter = Router();
parkingSlotRouter.use(checkAdmin);

parkingSlotRouter.get("/", getAllParkingSlots);
parkingSlotRouter.get("/available", getAvailableParkingSlots); // Get all available parking slots
parkingSlotRouter.get("/:id", getParkingSlotById);
parkingSlotRouter.post("/create", validationMiddleware(CreateParkingSlotDto), createParkingSlot);
parkingSlotRouter.put("/update", validationMiddleware(UpdateParkingSlotDto, true), updateParkingSlot);
parkingSlotRouter.delete("/delete", deleteParkingSlot);

export default parkingSlotRouter;
