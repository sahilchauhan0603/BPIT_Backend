import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateGalleryDto {
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  imageTitle?: string;

  @IsOptional()
  @IsString()
  imageDescription?: string;

  @IsOptional()
  @IsInt()
  societyId?: number;
}
