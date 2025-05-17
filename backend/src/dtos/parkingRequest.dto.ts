import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateParkingRequestDTO {
    @IsString()
    @IsNotEmpty()
    vehicleId: string;

    @IsDateString()
    @IsNotEmpty()
    checkIn: string;

    @IsDateString()
    @IsNotEmpty()
    checkOut: string;
}

export class UpdateParkingRequestDTO {
    @IsOptional()
    @IsString()
    status?: "PENDING" | "APPROVED" | "REJECTED";

    @IsOptional()
    @IsString()
    parkingSlotId?: string;
}
