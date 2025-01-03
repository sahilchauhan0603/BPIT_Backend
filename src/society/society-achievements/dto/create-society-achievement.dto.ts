import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateSocietyAchievementDto {
  @IsNotEmpty()
  @IsInt()
  societyId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
