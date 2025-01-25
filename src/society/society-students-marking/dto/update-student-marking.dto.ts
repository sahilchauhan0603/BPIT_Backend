import { IsOptional, IsString } from 'class-validator';

export class UpdateStudentMarkingDto {
  @IsOptional()
  @IsString()
  studentGrades?: string;
}
