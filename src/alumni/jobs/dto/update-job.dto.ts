import { IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdateJobPostingDto {
  @IsOptional()
  @IsString()
  jobTitle?: string;

  @IsOptional()
  @IsString()
  jobDescription?: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  companyLocation?: string;

  @IsOptional()
  @IsEnum(['Remote', 'Onsite', 'Hybrid'])
  jobMode?: string;

  @IsOptional()
  @IsEnum(['Full-time', 'Part-time', 'Internship'])
  jobType?: string;

  @IsOptional()
  @IsString()
  jobCategory?: string;

  @IsOptional()
  @IsString()
  expectedSalary?: string;

  @IsOptional()
  @IsString()
  applyLink?: string;
}
