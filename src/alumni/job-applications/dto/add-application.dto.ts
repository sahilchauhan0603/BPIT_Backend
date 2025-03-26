import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApplicationStatus } from "./status.enum";

export class CreateJobApplicationDto {
    @IsInt()
    @IsNotEmpty()
    jobPostingId: number
    @IsInt()
    @IsNotEmpty()
    userId: number
    @IsString()
    @IsNotEmpty()
    resumeUrl: string
    @IsString()
    @IsOptional()
    coverLetter?: string

    @IsEnum(["PENDING","SHORTLISTED","REJECTED","HIRED"])
    @IsNotEmpty()
    status: ApplicationStatus = "PENDING" as ApplicationStatus
}