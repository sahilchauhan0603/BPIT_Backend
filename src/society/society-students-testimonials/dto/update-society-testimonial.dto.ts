import { IsOptional, IsInt, IsString } from 'class-validator';

export class UpdateSocietyTestimonialDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  societyTestimonialId: number;
}
