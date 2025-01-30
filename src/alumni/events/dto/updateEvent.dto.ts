import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  eventName?: string;
  @IsString()
  @IsOptional()
  eventDescription?: string;
  @IsDateString()
  @IsOptional()
  eventDate?: Date;
  @IsString()
  @IsOptional()
  eventType?: string;
  @IsString()
  @IsOptional()
  eventLocation?: string;
  @IsString()
  @IsOptional()
  eventImage?: string;
  @IsEnum(['Online', 'Hybrid', 'Offline'])
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

export class UpdateEventAttendeDto {
  @IsInt()
  @IsOptional()
  eventId: number;
  @IsInt()
  @IsOptional()
  userId: number;
  @IsString()
  @IsOptional()
  role: string;
}
