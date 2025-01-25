import { IsString, IsOptional, IsBoolean, IsDate } from 'class-validator';

export class UpdateInterviewExperienceDto {
  @IsOptional()
  @IsString()
  Title?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isApproved?: boolean;

  @IsOptional()
  @IsString()
  interviewBody?: string;

  @IsOptional()
  @IsDate()
  interviewDate?: Date;

  @IsOptional()
  @IsBoolean()
  onCampus?: boolean;

  @IsOptional()
  @IsBoolean()
  refferal?: boolean;

  @IsOptional()
  @IsString()
  anyTips?: string;
}
