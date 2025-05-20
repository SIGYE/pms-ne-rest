/*
  Warnings:

  - Made the column `parking_id` on table `parkingSlot` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "parkingSlot" DROP CONSTRAINT "parkingSlot_parking_id_fkey";

-- AlterTable
ALTER TABLE "parkingSlot" ALTER COLUMN "parking_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "parkingSlot" ADD CONSTRAINT "parkingSlot_parking_id_fkey" FOREIGN KEY ("parking_id") REFERENCES "parking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
