import { ApplStatus } from "@prisma/client"
import { IsEnum, IsInt, IsNotEmpty } from "class-validator"

export class CreateMentorshipAppicationDto {
    @IsInt()
    @IsNotEmpty()
    userId: number
    @IsInt()
    @IsNotEmpty()
    mentorshipId: number
    @IsEnum(ApplStatus)
    @IsNotEmpty()
    status: ApplStatus
}

export class UpdateMentorshipAppicationStatusDto {
    @IsEnum(ApplStatus)
    @IsNotEmpty()
    status: ApplStatus

}