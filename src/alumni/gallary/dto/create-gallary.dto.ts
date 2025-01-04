import { IsNotEmpty, IsString } from "class-validator";

export class CreateGalleryDto {

    @IsString()
    @IsNotEmpty()
    imageUrl: string;

    @IsString()
    @IsNotEmpty()
    imageTitle: string;

    @IsString()
    @IsNotEmpty()
    imageDescription: string;
}
  
  
  