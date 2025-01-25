import {
  IsString,
  IsOptional,
  IsDate,
  IsBoolean,
  IsUrl,
  IsEmail,
} from 'class-validator';

export class EditSocietyDTO {
  @IsOptional() // Optional because it can be manually provided
  societyId?: number;

  @IsOptional()
  @IsString()
  societyType?: string;

  @IsOptional()
  facultyId?: number;

  @IsOptional()
  @IsString()
  societyName?: string;

  @IsOptional()
  @IsString()
  societyHead?: string;

  @IsOptional()
  @IsDate()
  dateOfRegistration?: Date;

  @IsOptional()
  @IsString()
  societyDescription?: string;

  @IsOptional()
  @IsUrl()
  societyImage?: string;

  @IsOptional()
  @IsEmail()
  societyEmail?: string;

  @IsOptional()
  @IsString()
  societyHeadMobile?: string;

  @IsOptional()
  @IsUrl()
  societyWebsite?: string;

  @IsOptional()
  @IsBoolean()
  isApproved?: boolean;

  // Optional relationships (These can be handled in your service layer)
  @IsOptional()
  coordinator?: any[]; // SocietyCoordinator relation (array of objects or IDs)

  @IsOptional()
  testimonial?: any[]; // SocietyTestimonial relation

  @IsOptional()
  societyAchievements?: any[]; // SocietyAchievement relation

  @IsOptional()
  societyMembers?: any[]; // SocietyMember relation

  @IsOptional()
  gallery?: any[]; // SocietyGallery relation

  @IsOptional()
  news?: any[]; // SocietyNews relation

  @IsOptional()
  events?: any[]; // Event relation

  @IsOptional()
  users?: any[]; // User relation

  @IsOptional()
  studentAchievements?: any[]; // StudentAchievement relation

  @IsOptional()
  studentMarking?: any[]; // StudentMarking relation
}
