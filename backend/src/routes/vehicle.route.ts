import { Router } from "express";
import vehicleController from "../controllers/vehicle.controller";
import { checkAdmin, checkLoggedIn } from "../middlewares/auth.middleware";
import { validationMiddleware } from "../middlewares/validator.middleware";
import { CreateVehicleDTO, UpdateVehicleDTO } from "../dtos/vehicle.dto";

const router = Router();

router.post("/", checkLoggedIn, validationMiddleware(CreateVehicleDTO), vehicleController.createVehicle);
router.get("/getMyVehicles", checkLoggedIn, vehicleController.getUserVehicles);
router.get("/:id", checkLoggedIn, vehicleController.getVehicleById);
router.put("/:id", checkLoggedIn, validationMiddleware(UpdateVehicleDTO, true), vehicleController.updateVehicle);
router.delete("/:id", checkLoggedIn, vehicleController.deleteVehicle);

export default router;
