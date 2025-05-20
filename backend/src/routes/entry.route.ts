import { Router } from "express";
import * as entryController from "../controllers/entry.controller";
import { checkLoggedIn, checkAdmin } from "../middlewares/auth.middleware";
import { validationMiddleware } from "../middlewares/validator.middleware";
import { CreateEntryDTO } from "../dtos/entry.dto";

const entryRouter = Router();

// Create a new parking entry
entryRouter.post(
  "/create",
  checkLoggedIn, // User must be logged in
  validationMiddleware(CreateEntryDTO), // Validate input data
  entryController.createEntry
);


export default entryRouter;
