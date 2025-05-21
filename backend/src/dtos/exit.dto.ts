// dtos/CarExitDTOs.ts

import { IsNotEmpty, IsDateString, IsInt, IsString } from 'class-validator';

export class CreateCarExitDTO {
  @IsNotEmpty()
  @IsString()
  plateNumber: string;

  @IsNotEmpty()
  @IsDateString()
  entryDateTime: string;

  @IsNotEmpty()
  @IsDateString()
  exitDateTime: string;

  @IsNotEmpty()
  @IsInt()
  chargedAmount: number;

  @IsNotEmpty()
  @IsString()
  parkingCode: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}

export class UpdateCarExitDTO {
  @IsNotEmpty()
  @IsDateString()
  exitDateTime: string;

  @IsNotEmpty()
  @IsInt()
  chargedAmount: number;

  @IsNotEmpty()
  @IsString()
  plateNumber: string;

  @IsNotEmpty()
  @IsString()
  parkingCode: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
