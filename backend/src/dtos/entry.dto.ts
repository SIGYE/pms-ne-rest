// dtos/CarEntryDTOs.ts

import { IsNotEmpty, IsOptional, IsString, IsUUID, IsDateString } from 'class-validator';

export class CreateCarEntryDTO {
  @IsNotEmpty()
  @IsString()
  plateNumber: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  parkingSlotId: string;

  @IsNotEmpty()
  @IsString()
  parkingCode: string;

  @IsNotEmpty()
  @IsUUID()
  vehicleId: string;

  @IsOptional()
  @IsDateString()
  entryDateTime?: string; // optional; defaults to now
}
