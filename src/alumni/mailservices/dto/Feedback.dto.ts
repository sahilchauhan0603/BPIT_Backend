import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class FeedbackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  feedback: string;
}
