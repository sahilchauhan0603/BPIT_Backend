import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddAnnoncementDTO } from './dto';

@Injectable()
export class AnnouncementsService {
    constructor(private prisma: PrismaService) {}

    async addAnnouncement(dto: AddAnnoncementDTO) {
        const announcement = await this.prisma.achievementAnnouncement.create({
            data: {
                mentorId: dto.mentorId,
                achievementId: dto.achievementId
            }
        })
        return {
            status: 'success',
            announcement,
            message: 'Announcement created successfully',
        }
    }

    async getAnnouncements() {
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    
        const announcements = await this.prisma.achievementAnnouncement.findMany({
            where: {
                dateCreated: {
                    gte: startOfDay, 
                    lte: endOfDay, 
                }
            },
            include: {
                achievement: {
                    select: {
                        title: true, 
                        description: true, 
                        startDate: true, 
                        organizedBy: true, 
                        result: true, 
                        user: {
                            select: {
                                firstName: true,
                                lastName: true,
                                branch: true,
                                section: true,
                                passingYear: true
                            }
                        }
                    }
                }
            }
        });
    
        return {
            status: 'success',
            announcements,
            message: 'Announcements fetched successfully',
        };
    }
    
    async deleteAnnouncement(announcementId: number){
        const announcement = await this.prisma.achievementAnnouncement.findUnique(
            {
                where: {
                    id: announcementId
                }
            }
        )
        if(!announcement){
            return {
                status: 'error',
                message: 'Announcement not found',
            }
        }
        await this.prisma.achievementAnnouncement.delete({
            where:{
                id: announcementId
            }
        })
        return {
            status: 'success',
            message: 'Announcement deleted successfully',
        }
    }
}
