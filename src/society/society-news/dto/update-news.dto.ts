import {
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  IsDateString,
} from 'class-validator';

export class UpdateNewsDto {
  @IsOptional()
  @IsString()
  newsTitle?: string;

  @IsOptional()
  @IsString()
  newsDescription?: string;

  @IsOptional()
  @IsString()
  newsImage?: string;

  @IsOptional()
  @IsDateString()
  newsDate?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsInt()
  societyId?: number;
}
