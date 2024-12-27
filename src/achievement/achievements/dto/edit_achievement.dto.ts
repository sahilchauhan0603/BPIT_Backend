import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { Mode } from '../enum';

export class EditAchievementDTO {
  @IsString()
  @IsOptional()
  title: string;

  @IsDate()
  @IsOptional()
  startDate: Date;

  @IsDate()
  @IsOptional()
  endDate: Date;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  organizedBy: string;

  @IsBoolean()
  @IsOptional()
  isTechnical: boolean;

  @IsString()
  @IsOptional()
  mode: Mode;

  @IsString()
  @IsOptional()
  result: string;

}
