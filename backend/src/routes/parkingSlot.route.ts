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

const router = Router();
router.use(checkAdmin);

router.get("/", getAllParkingSlots);
router.get("/available", getAvailableParkingSlots); // Get all available parking slots
router.get("/:id", getParkingSlotById);
router.post("/", validationMiddleware(CreateParkingSlotDto), createParkingSlot);
router.put("/:id", validationMiddleware(UpdateParkingSlotDto, true), updateParkingSlot);
router.delete("/:id", deleteParkingSlot);

export default router;
