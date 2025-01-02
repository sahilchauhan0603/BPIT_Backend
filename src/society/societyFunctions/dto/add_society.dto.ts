import {
  IsString,
  IsOptional,
  IsDate,
  IsBoolean,
  IsUrl,
  IsEmail,
} from 'class-validator';

export class AddSocietyDto {
  @IsString()
  societyType: string;

  @IsString()
  societyName: string;

  @IsString()
  societyHead: string;

  @IsDate()
  dateOfRegistration: Date;

  @IsString()
  societyDescription: string;

  @IsUrl()
  societyImage: string;

  @IsEmail()
  societyEmail: string;

  @IsString()
  societyHeadMobile: string;

  @IsUrl()
  societyWebsite: string;

  @IsOptional()
  @IsBoolean()
  isApproved?: boolean; // Defaults to false if not provided

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
