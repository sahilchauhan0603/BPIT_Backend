import { 
    IsNotEmpty, 
    IsString, 
    IsOptional, 
    IsEnum, 
    IsInt, 
    Validate, 
    ValidationArguments, 
    ValidatorConstraint, 
    ValidatorConstraintInterface 
  } from 'class-validator';
  import { MentorType, ProgramStatus } from '@prisma/client';
  import { PartialType } from '@nestjs/mapped-types';
  
  /**
   * Custom validator to ensure only one mentor is set (either faculty or alumni, not both).
   */
  @ValidatorConstraint({ name: 'OnlyOneMentor', async: false })
  class OnlyOneMentorConstraint implements ValidatorConstraintInterface {
    validate(_: any, args: ValidationArguments) {
      const obj = args.object as any;
      return !(obj.facultyMentorId && obj.alumniMentorId); // Return false if both are set
    }
  
    defaultMessage() {
      return 'Only one mentor can be assigned: Either facultyMentorId or alumniMentorId, but not both.';
    }
  }
  
  export class CreateMentorshipProgramDto {
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @IsNotEmpty()
    @IsEnum(MentorType)
    mentorType: MentorType;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @IsNotEmpty()
    @IsString()
    category: string;
  
    @IsNotEmpty()
    @IsString()
    duration: string;
  
    @IsOptional()
    @IsString()
    prerequisites?: string;
  
    @IsNotEmpty()
    @IsString()
    schedule: string;
  
    @IsNotEmpty()
    @IsEnum(ProgramStatus)
    status: ProgramStatus;
  
    @IsOptional()
    @IsInt()
    facultyMentorId?: number;
  
    @IsOptional()
    @IsInt()
    alumniMentorId?: number;
  
    @Validate(OnlyOneMentorConstraint)
    onlyOneMentor: boolean;  // This field is used only for validation and will not be saved
  }
  
  // Makes all properties optional for update, but still applies validation
  export class UpdateMentorshipProgramDto extends PartialType(CreateMentorshipProgramDto) {}
  