import { IsInt, IsBoolean, IsOptional, Min, IsUUID } from "class-validator";

export class CreateParkingSlotDto {
  @IsInt()
  @Min(1)
  slotNumber: number;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

   @IsUUID("4", { message: "Invalid parkingId format" })
  parkingId: string;
}

export class UpdateParkingSlotDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  slotNumber?: number;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}
