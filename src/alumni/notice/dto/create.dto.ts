import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateNoticeDto {
  @IsString()
  @IsNotEmpty()
  noticeTitle: string;
  @IsString()
  @IsOptional()
  noticeDescription?: string;
  @IsDateString()
  @IsNotEmpty()
  noticeDate: string;
  @IsString()
  @IsNotEmpty()
  noticeLink: string;
}
