import { Router } from "express";
import vehicleController from "../controllers/vehicle.controller";
import { checkAdmin, checkLoggedIn } from "../middlewares/auth.middleware";
import { validationMiddleware } from "../middlewares/validator.middleware";
import { CreateVehicleDTO, UpdateVehicleDTO } from "../dtos/vehicle.dto";

const vehicleRouter = Router();

vehicleRouter.post("/create", checkLoggedIn, validationMiddleware(CreateVehicleDTO), vehicleController.createVehicle);
vehicleRouter.get("/getMyVehicles", checkLoggedIn, vehicleController.getUserVehicles);
vehicleRouter.get("/:id", checkLoggedIn, vehicleController.getVehicleById);
vehicleRouter.put("/update", checkLoggedIn, validationMiddleware(UpdateVehicleDTO, true), vehicleController.updateVehicle);
vehicleRouter.delete("/delete", checkLoggedIn, vehicleController.deleteVehicle);

export default vehicleRouter;
