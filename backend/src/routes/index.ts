import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import vehicleRouter from "./vehicle.route";
import parkingSessionRouter from "./parking.route";
import parkingSlotRouter from "./parkingSlot.route";
import entryRouter from "./entry.route";

const router = Router();

router.use("/auth", authRouter
    /*
        #swagger.tags = ['Auth']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
);
router.use("/user", userRouter
    /*
        #swagger.tags = ['Users']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
);
router.use("/vehicles", vehicleRouter
    /*
        #swagger.tags = ['Vehicles']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
);
router.use("/parking", parkingSessionRouter
    /*
        #swagger.tags = ['Parking Requests']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
);
router.use("/parkingSlots", parkingSlotRouter
    /*
        #swagger.tags = ['Parking Slots']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
);

router.use("/entry", entryRouter
    /*
        #swagger.tags = ['Entries']
        #swagger.security = [{
            "bearerAuth": []
        }]
    */
);

export default router;
