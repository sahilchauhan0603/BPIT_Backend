import { IsNotEmpty, IsEnum, IsOptional, IsString } from "class-validator";
import { ApplicationStatus } from "./status.enum";
export class UpdateJobApplicationDto {

    @IsString()
    @IsOptional()
    resumeUrl: string

    @IsString()
    @IsOptional()
    coverLetter?: string

}

export class UpdateApplicationStatusDto {
    @IsEnum(["PENDING","SHORTLISTED","REJECTED","HIRED"])
    @IsNotEmpty()
    status: ApplicationStatus
}