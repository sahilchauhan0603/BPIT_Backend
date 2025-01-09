import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";

export class AddEventDto {
    @IsString()
    @IsNotEmpty()
    eventName: string;
    @IsString()
    @IsNotEmpty()
    eventDescription: string;
    @IsDateString()
    @IsNotEmpty()
    eventDate: Date;
    @IsString()
    @IsNotEmpty()
    eventType: string;
    @IsString()
    @IsNotEmpty()
    eventLocation: string;
    @IsString()
    @IsNotEmpty()
    eventImage: string;
    @IsEnum(["Online","Hybrid","Offline"])
    @IsNotEmpty()
    eventMode: string;
    @IsString()
    @IsNotEmpty()
    category: string;
    @IsString()
    @IsNotEmpty()
    subcategory: string;
    @IsString()
    @IsNotEmpty()
    linkToRegister: string;

}

export class AddEventAttendeDto {
    @IsInt()
    @IsNotEmpty()
    eventId: number;
    @IsInt()
    @IsNotEmpty()
    userId: number;
    @IsString()
    @IsNotEmpty()
    role: string;
}