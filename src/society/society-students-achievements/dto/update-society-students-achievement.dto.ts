import { IsInt, IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateStudentAchievementDto {
  @IsInt()
  achievementId: number;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  dateAchieved?: string;
}
