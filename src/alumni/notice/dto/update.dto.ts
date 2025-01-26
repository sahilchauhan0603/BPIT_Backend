import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

export class UpdateNoticeDto {
  @IsString()
  @IsOptional()
  noticeTitle: string;
  @IsString()
  @IsOptional()
  noticeDescription?: string;
  @IsDateString()
  @IsOptional()
  noticeDate:  string;
  @IsString()
  @IsOptional()
  noticeLink: string;
}
