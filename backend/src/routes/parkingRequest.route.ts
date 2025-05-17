import { Router } from "express";
import parkingRequestController from "../controllers/parkingRequest.controller";
import { checkAdmin, checkLoggedIn } from "../middlewares/auth.middleware";
import { validationMiddleware } from "../middlewares/validator.middleware";
import { CreateParkingRequestDTO, UpdateParkingRequestDTO } from "../dtos/parkingRequest.dto";

const parkingRouter = Router();

parkingRouter.post("/", checkLoggedIn, validationMiddleware(CreateParkingRequestDTO), parkingRequestController.createParkingRequest);
parkingRouter.get("/myRequests", checkLoggedIn, parkingRequestController.getUserParkingRequests);
parkingRouter.get("/allRequests", checkAdmin, parkingRequestController.getAllParkingRequests);
parkingRouter.put("/approve/:id", checkAdmin, parkingRequestController.approveParkingRequest);
parkingRouter.put("/reject/:id", checkAdmin, parkingRequestController.rejectParkingRequest);

export default parkingRouter;
