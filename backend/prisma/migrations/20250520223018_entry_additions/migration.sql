/*
  Warnings:

  - You are about to drop the `entry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "entry" DROP CONSTRAINT "entry_slot_id_fkey";

-- DropForeignKey
ALTER TABLE "entry" DROP CONSTRAINT "entry_vehicle_id_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_slot_id_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_vehicle_id_fkey";

-- DropTable
DROP TABLE "entry";

-- DropTable
DROP TABLE "payments";

-- CreateTable
CREATE TABLE "carentries" (
    "id" SERIAL NOT NULL,
    "plateNumber" TEXT NOT NULL,
    "entryDateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exitDateTime" TIMESTAMP(3),
    "chargedAmount" INTEGER NOT NULL DEFAULT 0,
    "parkingCode" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "parkingSlotId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,

    CONSTRAINT "carentries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carexits" (
    "id" SERIAL NOT NULL,
    "plateNumber" TEXT NOT NULL,
    "entryDateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exitDateTime" TIMESTAMP(3) NOT NULL,
    "chargedAmount" INTEGER NOT NULL DEFAULT 0,
    "parkingCode" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "carexits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "parkingId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "carEntryId" INTEGER,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bills" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "parkingCode" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "carEntryId" INTEGER,

    CONSTRAINT "bills_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "carentries" ADD CONSTRAINT "carentries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carentries" ADD CONSTRAINT "carentries_parkingSlotId_fkey" FOREIGN KEY ("parkingSlotId") REFERENCES "parkingSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carentries" ADD CONSTRAINT "carentries_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carexits" ADD CONSTRAINT "carexits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carexits" ADD CONSTRAINT "carexits_parkingCode_fkey" FOREIGN KEY ("parkingCode") REFERENCES "parking"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "parking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_carEntryId_fkey" FOREIGN KEY ("carEntryId") REFERENCES "carentries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_carEntryId_fkey" FOREIGN KEY ("carEntryId") REFERENCES "carentries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
