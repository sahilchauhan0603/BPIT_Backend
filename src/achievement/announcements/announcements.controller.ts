import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AddAnnoncementDTO } from './dto';

@Controller('announcements')
export class AnnouncementsController {
    constructor(private readonly announcementsService: AnnouncementsService) {}

    @Post('')
    async addAnnouncement(@Body() dto: AddAnnoncementDTO) {
        return this.announcementsService.addAnnouncement(dto);
    }
    @Get('')
    async getAnnouncements(){
        return this.announcementsService.getAnnouncements();
    }

    @Delete(':id')
    async deleteAnnouncement(@Param('id') announcementId: number){
        return this.announcementsService.deleteAnnouncement(announcementId);
    }
}
