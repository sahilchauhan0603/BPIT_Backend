import { IsNotEmpty, IsNumber } from "class-validator"

export class AddAnnoncementDTO {

    @IsNumber()
    @IsNotEmpty()
    achievementId: number
    @IsNumber()
    @IsNotEmpty()
    userId: number
    @IsNumber()
    @IsNotEmpty()
    mentorId: number
}