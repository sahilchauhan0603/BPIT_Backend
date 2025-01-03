import {
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
  IsInt,
  IsNotEmpty,
} from 'class-validator';

export class CreateInterviewExperienceDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  Title: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  isApproved: boolean = false; // Default to false when creating

  @IsString()
  @IsNotEmpty()
  interviewBody: string;

  @IsDate()
  interviewDate: Date;

  @IsBoolean()
  onCampus: boolean;

  @IsBoolean()
  refferal: boolean;

  @IsOptional()
  @IsString()
  anyTips?: string;
}
