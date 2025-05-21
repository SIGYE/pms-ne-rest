import cron from "node-cron";
import prisma from "../../prisma/prisma-client";

export const startParkingSlotAvailabilityJob = () => {
  cron.schedule("* * * * *", async () => {
    console.log("Running auto-checkout job...");

    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago

    try {
      const expiredEntries = await prisma.carEntry.findMany({
        where: {
          exitDateTime: null,
          entryDateTime: {
            lte: twoHoursAgo,
          },
        },
        include: {
          parkingSlot: {
            include: {
              parking: true,
            },
          },
        },
      });

      for (const entry of expiredEntries) {
        const now = new Date();
        const entryTime = entry.entryDateTime;
        const durationMs = now.getTime() - entryTime.getTime();
        const durationHours = Math.ceil(durationMs / (1000 * 60 * 60)); // Round up

        const feePerHour = entry.parkingSlot.parking?.feePerHour ?? 0;
        const totalFee = durationHours * feePerHour;

        await prisma.carEntry.update({
          where: { id: entry.id },
          data: {
            exitDateTime: now,
            chargedAmount: Math.floor(totalFee), // Ensure it's an integer
          },
        });

        await prisma.parkingSlot.update({
          where: { id: entry.parkingSlotId },
          data: {
            isAvailable: true,
          },
        });

        console.log(`Auto-checked out vehicle at slot ${entry.parkingSlotId}. Charged: ${totalFee} RWF`);
      }
    } catch (error) {
      console.error("Auto-checkout job failed:", error);
    }
  });
};
