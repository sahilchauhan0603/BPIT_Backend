import {
  isInt,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';
import { Role } from '../enum/index';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNumberString()
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @IsNotEmpty()
  branch: string;

  @IsString()
  @IsNotEmpty()
  enrollmentNumber: number;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: Role;

  @IsString()
  @IsNotEmpty()
  section: string;

  @IsInt()
  @IsNotEmpty()
  passingYear: number;

  @IsString()
  @IsNotEmpty()
  fathersName: string;

  @IsString()
  @IsNotEmpty()
  mothersName: string;

  @IsString()
  @IsNotEmpty()
  hobby: string;

  @IsNumberString()
  @IsNotEmpty()
  parentsPhone: string;

  @IsInt()
  facultyId: number;

  @IsInt()
  societyId: number;
}
