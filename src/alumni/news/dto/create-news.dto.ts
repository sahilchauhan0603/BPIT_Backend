import { IsNotEmpty, IsString } from "class-validator";

export class CreateNewsDto {

    @IsString()
    @IsNotEmpty()
    newsTitle: string;

    @IsString()
    @IsNotEmpty()
    newsDescription: string;

    @IsString()
    @IsNotEmpty()
    newsImage: string;

    @IsString()
    @IsNotEmpty()
    newsDate: Date;

    @IsString()
    @IsNotEmpty()
    author: string;
}
  
  
  