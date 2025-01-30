import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Mode, Status } from 'src/achievement/achievements/enum/index';
export class AddAchievemntDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  organizedBy: string;

  @IsEnum(['ONLINE', 'OFFLINE'])
  @IsNotEmpty()
  mode: Mode;

  @IsBoolean()
  @IsNotEmpty()
  isTechnical: boolean;

  @IsString()
  @IsNotEmpty()
  result: string;

  @IsString()
  @IsOptional()
  certificate?: string;

  @IsEnum(['PENDING', 'ACCEPTED', 'REJECTED'])
  @IsNotEmpty()
  status: Status;
}

export class AddAchievementImageDto {
  @IsInt()
  @IsNotEmpty()
  achievmentId: number;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}
