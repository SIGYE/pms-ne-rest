import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsNumber,
    Min,
    MaxLength,
    ValidateNested,
    ArrayMinSize,
  } from "class-validator";
  import { Type } from "class-transformer";
  import { CreateParkingSlotDto } from "./parkingSlot.dto"; // <-- adjust path if needed
  
  export class CreateParkingDTO {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;
  
    @IsNotEmpty()
    @IsString()
    location: string;
  
    @IsNotEmpty()
    @IsString()
    @MaxLength(10)
    code: string;
  
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    feePerHour: number;
  }
  
  export class UpdateParkingDTO {
    @IsOptional()
    @IsString()
    @MaxLength(50)
    name?: string;
  
    @IsOptional()
    @IsString()
    location?: string;
  
    @IsOptional()
    @IsString()
    code?: string;
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    feePerHour?: number;
  }
  