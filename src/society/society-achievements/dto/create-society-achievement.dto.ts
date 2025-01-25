import { IsNotEmpty, IsString, IsInt, IsDate } from 'class-validator';

export class CreateSocietyAchievementDto {
  @IsInt()
  societyAchievementId: number;

  @IsNotEmpty()
  @IsInt()
  societyId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsDate()
  dateAchieved: Date;
}
