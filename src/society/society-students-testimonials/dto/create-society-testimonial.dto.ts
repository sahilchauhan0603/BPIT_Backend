import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateSocietyTestimonialDto {
  userId: number;

  societyId: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  societyTestimonialId: number;
}
