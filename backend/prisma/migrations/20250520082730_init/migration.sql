-- CreateEnum
CREATE TYPE "roles" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "verification_status" AS ENUM ('VERIFIED', 'PENDING', 'UNVERIFIED');

-- CreateEnum
CREATE TYPE "password_reset_status" AS ENUM ('PENDING', 'IDLE');

-- CreateEnum
CREATE TYPE "vehicle_status" AS ENUM ('PENDING', 'APPROVED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "names" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "password" TEXT NOT NULL,
    "profile_picture" TEXT NOT NULL DEFAULT 'https://firebasestorage.googleapis.com/v0/b/relaxia-services.appspot.com/o/relaxia-profiles%2Fblank-profile-picture-973460_960_720.webp?alt=media',
    "role" "roles" NOT NULL DEFAULT 'USER',
    "verification_status" "verification_status" NOT NULL DEFAULT 'UNVERIFIED',
    "verification_code" TEXT,
    "verification_expires" TIMESTAMP(3),
    "password_reset_status" "password_reset_status" NOT NULL DEFAULT 'IDLE',
    "password_reset_code" TEXT,
    "password_reset_expires" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "plate_number" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "status" "vehicle_status" NOT NULL DEFAULT 'PENDING',
    "user_id" TEXT NOT NULL,
    "assigned_slot_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parking" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "fee_per_hour" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parkingSlot" (
    "id" TEXT NOT NULL,
    "slot_number" INTEGER NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "parking_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parkingSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "slot_id" TEXT NOT NULL,
    "check_in_time" TIMESTAMP(3) NOT NULL,
    "check_out_time" TIMESTAMP(3) NOT NULL,
    "duration_hours" INTEGER NOT NULL,
    "amount_paid" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entry" (
    "id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "slot_id" TEXT NOT NULL,
    "entry_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exit_time" TIMESTAMP(3),
    "charged_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "entry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_telephone_key" ON "users"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_plate_number_key" ON "vehicles"("plate_number");

-- CreateIndex
CREATE UNIQUE INDEX "parking_code_key" ON "parking"("code");

-- CreateIndex
CREATE UNIQUE INDEX "parkingSlot_slot_number_key" ON "parkingSlot"("slot_number");

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_assigned_slot_id_fkey" FOREIGN KEY ("assigned_slot_id") REFERENCES "parkingSlot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parkingSlot" ADD CONSTRAINT "parkingSlot_parking_id_fkey" FOREIGN KEY ("parking_id") REFERENCES "parking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "parkingSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entry" ADD CONSTRAINT "entry_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entry" ADD CONSTRAINT "entry_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "parkingSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
