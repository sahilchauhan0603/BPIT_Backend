import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  mobile: string;

  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsString()
  section: string;

  @IsString()
  role: string;

  @IsString()
  branch: string;

  @IsString()
  hobby: string;

  @IsString()
  fathersName: string;

  @IsString()
  mothersName: string;

  @IsString()
  parentsPhone: string;

  @IsOptional()
  @IsString()
  profilePictureUrl?: string;

  @IsOptional()
  facultyId: number;
}
