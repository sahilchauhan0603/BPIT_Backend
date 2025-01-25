import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Mode } from '../enum';

export class AddAchievementDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  organizedBy: string;

  @IsBoolean()
  @IsNotEmpty()
  isTechnical: boolean;

  @IsString()
  @IsNotEmpty()
  mode: Mode;

  @IsString()
  @IsNotEmpty()
  result: string;
}
