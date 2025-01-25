import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  imageUrl: string;

  @IsString()
  imageTitle: string;

  @IsString()
  imageDescription: string;

  @IsOptional()
  @IsInt()
  societyId?: number;
}
