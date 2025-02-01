/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Status } from './enum';
import { AddAchievementDTO, EditAchievementDTO } from './dto';
import { parse } from 'json2csv';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AchievementsService {
  constructor(private prisma: PrismaService) {}
  async addAchievement(
    dto: AddAchievementDTO,
    userId: number,
    mentorId: number,
  ) {
    let item: any;
    // check if achievement already exists
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
      return {
        status: 'error',
        item: {},
        message: 'Achievement already exists!',
      };
    // create an achievement if it doesn't exist yet
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
    // send verification request to the mentor
    const request = await this.prisma.verificationRequest.create({
      data: {
        achievementId: item.id,
        studentId: userId,
        mentorId,
      },
    });
    if (!request)
      return {
        status: 'error',
        item: {},
        message: 'Failed to send verification request to the mentor',
      };
    return {
      status: 'success',
      item: {},
      message: 'Achievement added successfully',
    };
  }
  // TODO: Integrate it with the add achievement api and one for the update achievement api
  async addCertificate(achievementId: number) {
    const achievement = await this.prisma.achievement.findUnique({
      where: { achievementId },
    });
    // upload certificate logic
    const certificateUrl = '';
    if (!achievement)
      return { status: 'error', item: {}, message: 'Achievement not found!' };
    const certificate = await this.prisma.achievement.update({
      where: { achievementId },
      data: {
        certificate: certificateUrl,
      },
    });
    if (!certificate) {
      return {
        status: 'error',
        item: {},
        message: 'Failed to add certificate',
      };
    }
    return {
      status: 'success',
      item: {},
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
      // TODO: show only the required fields for the frontend
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

  async exportUserAchievements(userId: number) {
    const achievements = await this.prisma.achievement.findMany({
      where: { userId },
      select: {
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

    if (achievements.length === 0) {
      throw new Error('No achievements found for the user.');
    }

    const formattedAchievements = achievements.map(ach => ({
      ...ach,
      certificate: ach.certificate ? 'Submitted' : 'Not Submitted',
    }));

    const fields = [
      { label: 'Title', value: 'title' },
      { label: 'Description', value: 'description' },
      { label: 'Certificate', value: 'certificate' },
      { label: 'Start Date', value: 'startDate' },
      { label: 'End Date', value: 'endDate' },
      { label: 'Organized By', value: 'organizedBy' },
      { label: 'Technical', value: 'isTechnical' },
      { label: 'Mode', value: 'mode' },
      { label: 'Result', value: 'result' },
      { label: 'Status', value: 'status' },
    ];

    const csv = parse(formattedAchievements, { fields });

    const fileName = `achievements_${userId}.csv`;
    const exportPath = path.join(__dirname, '..', '..', 'public', 'exports');
    const filePath = path.join(exportPath, fileName);

    if (!fs.existsSync(exportPath)) {
      fs.mkdirSync(exportPath, { recursive: true });
    }

    fs.writeFileSync(filePath, csv);
    return {
      status: 'success',
      url: `/exports/${fileName}`,
      message: 'Achievements found successfully!',
    };
  }
}
