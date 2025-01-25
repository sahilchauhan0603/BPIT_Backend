/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Status } from '../achievements/enum';

@Injectable()
export class NotificationsService {
    constructor(private prisma: PrismaService) {}

  async createNotification(studentId: number, content: string) {
    // check if already exist on basis of content (any other cond can be added)
    const existingNotification = await this.prisma.notification.findFirst({
        where: {
          userId: studentId,
          content: content,
          status: Status.PENDING
        }
      });
  
      // If notification already exists, error dedo
      if (existingNotification) {
        return {
          status: 'error',
          message: 'Notification already exists',
          notification: existingNotification
        };
      }
  

      const newNotification = await this.prisma.notification.create({
        data: {
          userId: studentId,
          content,
          status: Status.PENDING
        }
      });
  
      return {
        status: 'success',
        message: 'Notification created successfully',
        notification: newNotification
      };
  }

  async updateNotificationStatus(notificationId: number, status: Status) {
    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { status }
    });
  }

  async getNotificationsByStudentId(studentId: number) {
    return this.prisma.notification.findMany({
      where: { userId: studentId },
      orderBy: { dateCreated: 'desc' }
    });
  }

  async getAllNotifications() {
    return this.prisma.notification.findMany({
      orderBy: { dateCreated: 'desc' }
    });
  }
}
