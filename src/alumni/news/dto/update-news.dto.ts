import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateNewsDto {
  @IsString()
  @IsOptional()
  newsTitle?: string;

  @IsString()
  @IsOptional()
  newsDescription?: string;

  @IsString()
  @IsOptional()
  newsImage?: string;

  @IsDateString()
  @IsOptional()
  newsDate?: Date;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  author?: string;
}
