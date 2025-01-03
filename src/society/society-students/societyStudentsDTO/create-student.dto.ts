import {
  IsInt,
  IsString,
  IsDate,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateStudentDto {
  @IsInt()
  userId: number;

  @IsInt()
  enrollmentNo: number;

  @IsInt()
  societyId: number;

  @IsString()
  societyPosition: string;

  @IsString()
  domainExpertise: string;

  @IsString()
  memberType: string;

  @IsString()
  studentContributions: string;

  @IsBoolean()
  @IsOptional() // The default value is true, so it's optional in the input
  isApproved?: boolean = true;

  @IsBoolean()
  @IsOptional() // The default value is true, so it's optional in the input
  isActiveMember?: boolean = true;

  @IsDate()
  dateJoined: Date;

  @IsOptional()
  @IsDate()
  dateResigned?: Date;

  @IsDate()
  createdAt?: Date = new Date();

  @IsDate()
  updatedAt?: Date;
}
