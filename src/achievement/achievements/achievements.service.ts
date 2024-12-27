import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Status } from './enum';
import { AddAchievementDTO } from './dto';

@Injectable()
export class AchievementsService {
    constructor(private prisma: PrismaService) {}

    async addAchievement(dto: AddAchievementDTO) {
        let item;
        item = await this.prisma.achievements.findFirst({
            where: {
                // userId,
                title: dto.title,
                description: dto.description,
                startDate: dto.startDate,
                endDate: dto.endDate
            }
        })
        if(item) return {status: 'error', message: 'Achievement already exists!'}
        item = await this.prisma.achievements.create({
            data: {
                title: dto.title,
                description: dto.description,
                startDate: dto.startDate,
                endDate: dto.endDate,
                // userId: dto.userId
                organizedBy: dto.organizedBy,
                isTechnical: dto.isTechnical,
                mode: dto.mode,
                result: dto.result,
                status: Status.PENDING,
            }
        })
        return {status: 'success', item, message: 'Achievement added successfully'}
    }

    
}
