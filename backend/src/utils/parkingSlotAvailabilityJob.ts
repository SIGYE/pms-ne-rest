import cron from "node-cron";
import prisma from "../../prisma/prisma-client";

export const startParkingSlotAvailabilityJob = () => {
  cron.schedule("* * * * *", async () => {
    console.log("Running auto-checkout job...");

    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago

    try {
      const expiredEntries = await prisma.entry.findMany({
        where: {
          exitTime: null,
          entryTime: {
            lte: twoHoursAgo,
          },
        },
        include: {
          slot: {
            include: {
              parking: true,
            },
          },
        },
      });

      for (const entry of expiredEntries) {
        const now = new Date();
        const entryTime = entry.entryTime;
        const durationMs = now.getTime() - entryTime.getTime();
        const durationHours = Math.ceil(durationMs / (1000 * 60 * 60)); // Round up

        const feePerHour = entry.slot.parking?.feePerHour?? 0;
        const totalFee = durationHours * feePerHour;

        await prisma.entry.update({
          where: { id: entry.id },
          data: {
            exitTime: now,
            chargedAmount: totalFee,
          },
        });

        await prisma.parkingSlot.update({
          where: { id: entry.slotId },
          data: {
            isAvailable: true,
          },
        });

        console.log(`Auto-checked out vehicle at slot ${entry.slotId}. Charged: ${totalFee} RWF`);
      }
    } catch (error) {
      console.error("Auto-checkout job failed:", error);
    }
  });
};
