import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import vehicleRouter from "./vehicle.route";
import parkingRouter from "./parkingRequest.route";
import parkingSlotRouter from "./parkingSlot.route";

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
router.use("/parkingRequests", parkingRouter
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

export default router;
