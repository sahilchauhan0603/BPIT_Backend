import { IsOptional, IsString } from 'class-validator';

export class UpdateGalleryDto {
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  imageTitle?: string;

  @IsString()
  @IsOptional()
  imageDescription?: string;
}
