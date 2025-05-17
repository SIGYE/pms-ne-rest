import { IsInt, IsBoolean, IsOptional, Min } from "class-validator";

export class CreateParkingSlotDto {
  @IsInt()
  @Min(1)
  slotNumber: number;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
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
