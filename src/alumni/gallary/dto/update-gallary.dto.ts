import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  albumName?: string
  @IsString()
  @IsOptional()
  albumDescription?: string
  @IsString()
  @IsOptional()
  albumThumbnail?: string
}
export class UpdateImageDto {
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  imageTitle?: string;

  @IsString()
  @IsOptional()
  imageDescription?: string;

  @IsInt()
  @IsOptional()
  albumId: number;
}
