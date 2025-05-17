const cron = require("node-cron");
import prisma from "../../prisma/prisma-client";

export const startParkingSlotAvailabilityJob = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();

      const expiredRequests = await prisma.parkingRequest.findMany({
        where: {
          checkOut: {
            lte: now,
          },
          status: "APPROVED",
          parkingSlotId: {
            not: null,
          },
        },
      });

      for (const request of expiredRequests) {
        if (request.parkingSlotId) {
          // Update parking slot to available
          await prisma.parkingSlot.update({
            where: { id: request.parkingSlotId },
            data: { isAvailable: true },
          });
        }
      }
    } catch (error) {
      console.error("Error running parking slot availability job:", error);
    }
  });
};
