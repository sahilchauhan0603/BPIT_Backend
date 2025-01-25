import {
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class UpdateFacultyDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  department?: string;

  @IsString()
  @IsOptional()
  specialization?: string;

  @IsDateString()
  @IsOptional()
  joiningDate?: Date;

  @IsDateString()
  @IsOptional()
  resigningDate?: Date;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsString()
  @IsOptional()
  designation?: string;

  @IsString()
  @IsOptional()
  profilePictureUrl?: string;

  @IsString()
  @IsOptional()
  others?: string;

  @IsBoolean()
  @IsOptional()
  isActiveFaculty?: boolean;
}
