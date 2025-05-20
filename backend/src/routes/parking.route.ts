import { Router } from "express";
import * as parkingSessionController from "../controllers/parkingSession.controller";
import { checkAdmin, checkLoggedIn } from "../middlewares/auth.middleware";
import { validationMiddleware } from "../middlewares/validator.middleware";
import { CreateParkingDTO, UpdateParkingDTO } from "../dtos/parkingSession.dto";

const parkingSessionRouter = Router();

// Create a new parking
parkingSessionRouter.post(
  "/create",
  checkLoggedIn, // Ensure the user is logged in
  validationMiddleware(CreateParkingDTO), // Validate the request body
  parkingSessionController.createParking // Call the createParking controller
);

// Update an existing parking by ID
parkingSessionRouter.put(
  "/update",
  checkLoggedIn, // Ensure the user is logged in
  validationMiddleware(UpdateParkingDTO), // Validate the request body
  parkingSessionController.updateParking // Call the updateParking controller
);

// Delete a parking by ID
parkingSessionRouter.delete(
  "/delete",
  checkAdmin, // Ensure the user is an admin
  parkingSessionController.deleteParking // Call the deleteParking controller
);

// Get all parkings with optional search
parkingSessionRouter.get(
  "/",
  checkAdmin, // Ensure the user is an admin
  parkingSessionController.getAllParkings // Call the getAllParkings controller
);

// Optionally: Get a single parking by ID 
parkingSessionRouter.get(
  "/:id",
  checkLoggedIn, // Ensure the user is logged in
  parkingSessionController.getParkingById // Call the getParkingById controller 
);

export default parkingSessionRouter;