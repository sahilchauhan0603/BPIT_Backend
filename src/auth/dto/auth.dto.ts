import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";
import { Role } from "src/alumni/users/enum";

export class LoginDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: Role; // 'alumni' or 'student'

  @IsNumber()
  @IsNotEmpty()
  enrollmentNumber: number;

  @IsString()
  @IsNotEmpty()
  branch: string;

  @IsString()
  @IsNotEmpty()
  section: string;

  @IsInt()
  @IsNotEmpty()
  passingYear: number;

  @IsNumberString()
  @IsNotEmpty()
  mobile: string;


  isApproved: boolean = false; // Optional, default to false
}

export class ForgotPasswordDto {
    email: string;
}

export class ResetPasswordDto {
    token: string;
    newPassword: string;
}

export class VerifyEmailDto {
    @IsString()
    @IsNotEmpty()
    token: string;
}

export class ChangePasswordDto {
    oldPassword: string;
    newPassword: string;
}


