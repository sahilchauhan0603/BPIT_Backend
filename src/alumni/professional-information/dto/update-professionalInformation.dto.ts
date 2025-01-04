import { IsOptional, IsString, IsBoolean, IsDateString } from 'class-validator';

export class UpdateProfessionalInformationDto {
  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsString()
  CTC?: string;

  @IsOptional()
  @IsString()
  employmentType?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsBoolean()
  isApproved?: boolean;
}
