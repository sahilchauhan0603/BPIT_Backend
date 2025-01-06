import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateSocietyAchievementDto {
  @IsInt()
  societyAchievementId: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  societyId?: number; // You can optionally update the societyId, if required
}
