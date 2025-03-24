import { IsString, IsNotEmpty, IsEnum, IsBoolean } from 'class-validator';

export class CreateJobPostingDto {
  @IsNotEmpty()
  @IsString()
  jobTitle: string;

  @IsNotEmpty()
  @IsString()
  jobDescription: string;

  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  companyLocation: string;

  @IsNotEmpty()
  @IsEnum(['Remote', 'Onsite', 'Hybrid'])
  jobMode: string;

  @IsNotEmpty()
  @IsEnum(['Full-time', 'Part-time', 'Internship'])
  jobType: string;

  @IsNotEmpty()
  @IsString()
  jobCategory: string;

  @IsNotEmpty()
  @IsString()
  expectedSalary: string;

  @IsNotEmpty()
  @IsString()
  applyLink: string;

  @IsNotEmpty()
  @IsString()
  requiredSkills: string;      // Comma-separated skills
  @IsNotEmpty()
  @IsString()
  qualifications: string;
  
  @IsNotEmpty()
  @IsString()
  responsibilities: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean = true;
  userId: number; // User who posted the job
}
