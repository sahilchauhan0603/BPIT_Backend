import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Status } from './enum';
import { AddAchievementDTO, EditAchievementDTO } from './dto';

@Injectable()
export class AchievementsService {
  constructor(private prisma: PrismaService) {}

  async addAchievement(dto: AddAchievementDTO, userId: number) {
    let item: any;
    item = await this.prisma.achievement.findFirst({
      where: {
        userId,
        title: dto.title,
        description: dto.description,
        startDate: dto.startDate,
        endDate: dto.endDate,
      },
    });
    if (item)
      return { status: 'error', message: 'Achievement already exists!' };
    item = await this.prisma.achievement.create({
      data: {
        title: dto.title,
        description: dto.description,
        startDate: dto.startDate,
        endDate: dto.endDate,
        userId,
        organizedBy: dto.organizedBy,
        isTechnical: dto.isTechnical,
        mode: dto.mode,
        result: dto.result,
        status: Status.PENDING,
      },
    });
    return {
      status: 'success',
      item,
      message: 'Achievement added successfully',
    };
  }

  async addCertificate(achievementId: number) {
    const achievement = await this.prisma.achievement.findUnique({
      where: { achievementId },
    });
    // upload certificate logic
    const certificateUrl = '';
    if (!achievement)
      return { status: 'error', message: 'Achievement not found!' };
    const certificate = await this.prisma.achievement.update({
      where: { achievementId },
      data: {
        certificate: certificateUrl,
      },
    });
    return {
      status: 'success',
      certificate,
      message: 'Certificate added successfully',
    };
  }

  async editAchievement(achievementId: number, dto: EditAchievementDTO) {
    const achievement = await this.prisma.achievement.findUnique({
      where: { achievementId },
    });
    if (!achievement)
      return { status: 'error', message: 'Achievement not found!' };
    const item = await this.prisma.achievement.update({
      where: {
        achievementId,
      },
      data: dto,
    });
    return {
      status: 'success',
      item,
      message: 'Achievement updated successfully',
    };
  }

  async deleteAchievement(achievementId: number) {
    const achievement = await this.prisma.achievement.findUnique({
      where: { achievementId },
    });
    if (!achievement)
      return { status: 'error', message: 'Achievement not found!' };
    await this.prisma.achievement.delete({
      where: { achievementId },
    });
    return { status: 'success', message: 'Achievement deleted successfully' };
  }

  async getAchievement(achievementId: number) {
    const check = await this.prisma.achievement.findUnique({
      where: { achievementId },
    });
    if (!check) return { status: 'error', message: 'Achievement not found!' };
    const achievement = await this.prisma.achievement.findUnique({
      where: {
        achievementId,
      },
      select: {
        achievementId: true,
        title: true,
        description: true,
        certificate: true,
        startDate: true,
        endDate: true,
        organizedBy: true,
        isTechnical: true,
        mode: true,
        result: true,
        status: true,
        images: {
          select: {
            imageUrl: true,
          },
        },
        user: {
          select: {
            userId: true,
            firstName: true,
            lastName: true,
            enrollmentNumber: true,
          },
        },
      },
    });
    return {
      status: 'success',
      achievement,
      message: 'Achievement found successfully!',
    };
  }

  async getAllAchievements(userId: number) {
    const achievements = await this.prisma.achievement.findMany({
      where: {
        userId,
      },
      select: {
        achievementId: true,
        title: true,
        description: true,
        certificate: true,
        startDate: true,
        endDate: true,
        organizedBy: true,
        isTechnical: true,
        mode: true,
        result: true,
        status: true,
      },
    });
    if (!achievements)
      return { status: 'error', message: 'Achievements not found!' };
    return {
      status: 'success',
      achievements,
      message: 'Achievements found successfully!',
    };
  }
}
