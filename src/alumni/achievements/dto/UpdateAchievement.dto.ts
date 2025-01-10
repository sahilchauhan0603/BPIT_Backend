import { IsBoolean, IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Mode, Status } from "src/achievement/achievements/enum/index";
export class UpdateAchievementDto {
    @IsInt()
    @IsOptional()
    userId?: number;
    
    @IsString()
    @IsOptional()
    title?: string;
    
    @IsString()
    @IsOptional()
    description?: string;
    
    @IsDateString()
    @IsOptional()
    startDate?: string;
    
    @IsDateString()
    @IsOptional()
    endDate?: string;
    
    @IsString()
    @IsOptional()
    organizedBy?: string;
    
    @IsEnum(['ONLINE','OFFLINE'])
    @IsOptional()
    mode?: Mode;
        
    @IsBoolean()
    @IsOptional()    
    isTechnical?: boolean;
    
    @IsString()
    @IsOptional()    
    result?: string;
    
    @IsString()
    @IsOptional()    
    certificate?: string;
    
    @IsEnum(['PENDING','ACCEPTED','REJECTED'])
    @IsOptional()    
    status?: Status;
}

export class UpdateAchievementImageDto {
    @IsString()
    @IsNotEmpty()
    imageUrl: string;
}