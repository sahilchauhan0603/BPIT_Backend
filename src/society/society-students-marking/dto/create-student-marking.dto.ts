import { IsString } from 'class-validator';

export class CreateStudentMarkingDto {
  userId: number;

  societyId: number;

  @IsString()
  studentGrades: string;
}
