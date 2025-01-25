import {
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  IsDateString,
} from 'class-validator';

export class CreateNewsDto {
  @IsString()
  newsTitle: string;

  @IsString()
  newsDescription: string;

  @IsString()
  newsImage: string;

  @IsDateString()
  newsDate: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;

  @IsString()
  author: string;

  @IsOptional()
  @IsInt()
  societyId?: number;
}
