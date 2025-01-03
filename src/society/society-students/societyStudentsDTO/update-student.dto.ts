import {
  IsInt,
  IsString,
  IsDate,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdateStudentDto {
  @IsInt()
  @IsOptional()
  userId?: number;

  @IsInt()
  @IsOptional()
  enrollmentNo?: number;

  @IsInt()
  @IsOptional()
  societyId?: number;

  @IsString()
  @IsOptional()
  societyPosition?: string;

  @IsString()
  @IsOptional()
  domainExpertise?: string;

  @IsString()
  @IsOptional()
  memberType?: string;

  @IsBoolean()
  @IsOptional()
  isApproved?: boolean;

  @IsBoolean()
  @IsOptional()
  isActiveMember?: boolean;

  @IsDate()
  @IsOptional()
  dateJoined?: Date;

  @IsDate()
  @IsOptional()
  dateResigned?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
