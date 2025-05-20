-- DropForeignKey
ALTER TABLE "parkingSlot" DROP CONSTRAINT "parkingSlot_parking_id_fkey";

-- AlterTable
ALTER TABLE "parkingSlot" ALTER COLUMN "parking_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "parkingSlot" ADD CONSTRAINT "parkingSlot_parking_id_fkey" FOREIGN KEY ("parking_id") REFERENCES "parking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
