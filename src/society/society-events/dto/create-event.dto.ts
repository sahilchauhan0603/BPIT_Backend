import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  eventName: string;

  @IsString()
  @IsNotEmpty()
  eventDescription: string;

  @IsDateString()
  eventDate: string;

  @IsString()
  @IsNotEmpty()
  eventType: string;

  @IsString()
  @IsNotEmpty()
  eventLocation: string;

  @IsString()
  @IsNotEmpty()
  eventImage: string;

  @IsString()
  @IsNotEmpty()
  eventMode: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  subcategory: string;

  @IsString()
  @IsOptional()
  linkToRegister: string;

  societyId: number;
}
