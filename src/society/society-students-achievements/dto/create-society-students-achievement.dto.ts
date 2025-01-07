import { IsString, IsNotEmpty, IsDateString, IsInt } from 'class-validator';

export class CreateStudentAchievementDto {
  societyId: number;

  userId: number;

  @IsInt()
  achievementId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  dateAchieved: string;
}
