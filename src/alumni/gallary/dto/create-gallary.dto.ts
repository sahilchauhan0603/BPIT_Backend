import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  albumName: string;

  @IsString()
  @IsNotEmpty()
  albumDescription: string;

  @IsString()
  @IsNotEmpty()
  albumThumbnail: string;
}

export class AddImageDto {
  @IsString()
  @IsNotEmpty()
  imageTitle: string
  @IsString()
  @IsNotEmpty()
  imageDescription: string
  @IsString()
  @IsNotEmpty()
  imageUrl: string
  @IsInt()
  @IsNotEmpty()
  albumId: bigint
}