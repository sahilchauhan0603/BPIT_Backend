/* eslint-disable prettier/prettier */
import {
    Controller,
    Post,
    Patch,
    Get,
    Body,
    Param,
    UseGuards
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guards';
import { Status } from '../achievements/enum';

@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) { }

    @UseGuards(JwtGuard)
    @Post('create')
    async createNotification(
        @Body('content') content: string,
        @GetUser('id') studentId: number
    ) {
        const result = await this.notificationsService.createNotification(studentId, content);
        if (result.status === 'error') {
            return result;
        }

        return result.notification;
    }


    // changig the status of notification from mentor side either to Rejected or Accepted
    @UseGuards(JwtGuard)
    @Patch(':id/status')
    async updateNotificationStatus(
        @Param('id') notificationId: number,
        @Body('status') status: Status
    ) {
        return this.notificationsService.updateNotificationStatus(notificationId, status);
    }


    // all notifications of one student
    @UseGuards(JwtGuard)
    @Get('student')
    async getStudentNotifications(@GetUser('id') studentId: number) {
        return this.notificationsService.getNotificationsByStudentId(studentId);
    }


    // saare hi generated notifications of all students
    @UseGuards(JwtGuard)
    @Get('all')
    async getAllNotifications() {
        return this.notificationsService.getAllNotifications();
    }
}