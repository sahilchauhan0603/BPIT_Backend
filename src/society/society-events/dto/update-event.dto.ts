import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  eventName?: string;

  @IsString()
  @IsOptional()
  eventDescription?: string;

  @IsDateString()
  @IsOptional()
  eventDate?: string;

  @IsString()
  @IsOptional()
  eventType?: string;

  @IsString()
  @IsOptional()
  eventLocation?: string;

  @IsString()
  @IsOptional()
  eventImage?: string;

  @IsString()
  @IsOptional()
  eventMode?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  subcategory?: string;

  @IsString()
  @IsOptional()
  linkToRegister?: string;
}
