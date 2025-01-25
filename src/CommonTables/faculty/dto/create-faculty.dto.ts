import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateFacultyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  specialization: string;

  @IsDateString()
  @IsNotEmpty()
  joiningDate: Date;

  @IsDateString()
  @IsOptional()
  resigningDate?: Date;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  designation: string;

  @IsString()
  @IsNotEmpty()
  profilePictureUrl: string;

  @IsString()
  @IsOptional()
  others?: string;

  @IsBoolean()
  @IsOptional()
  isActiveFaculty?: boolean;
}
