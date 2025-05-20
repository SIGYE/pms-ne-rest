import {
    IsNotEmpty,
    IsOptional,
    IsUUID,
    IsDate,
    IsNumber,
    IsString,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  export class CreateEntryDTO {
    @IsNotEmpty()
    @IsString()
    plateNumber: string;
  
    @IsNotEmpty()
    @IsString()
    parkingCode: string;
  
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    entryTime: Date;
  
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    exitTime?: Date;
  
    @IsOptional()
    @IsNumber()
    chargedAmount?: number;
  }
  
  export class UpdateEntryDTO {
    @IsUUID()
    @IsNotEmpty()
    id: string;
  
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    exitTime?: Date;
  
    @IsOptional()
    @IsNumber()
    chargedAmount?: number;
  }
  