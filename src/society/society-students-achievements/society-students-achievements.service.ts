import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Assume PrismaService is available for DB operations
import { CreateStudentAchievementDto } from './dto/create-society-students-achievement.dto';
import { UpdateStudentAchievementDto } from './dto/update-society-students-achievement.dto';

@Injectable()
export class StudentAchievementService {
  constructor(private readonly prisma: PrismaService) {}

  async addAchievement(createDto: CreateStudentAchievementDto) {
    return this.prisma.studentAchievement.create({
      data: {
        achievementId: createDto.achievementId,
        societyId: createDto.societyId,
        userId: createDto.userId,
        title: createDto.title,
        description: createDto.description,
        dateAchieved: createDto.dateAchieved,
      },
    });
  }

  async updateAchievement(
    achievementId: number,
    updateDto: UpdateStudentAchievementDto,
  ) {
    const achievement = await this.prisma.studentAchievement.findUnique({
      where: { achievementId: achievementId },
    });

    // If the event doesn't exist, throw an error
    if (!achievement) {
      throw new Error('Achievement not found');
    }

    return this.prisma.studentAchievement.update({
      where: { achievementId: achievementId },
      data: updateDto,
    });
  }

  async getAllAchievements() {
    return this.prisma.studentAchievement.findMany({
      orderBy: { achievementId: 'asc' },
    });
  }

  async getAchievementsByEnrollment(enrollmentNo: number) {
    // Fetch the achievements using a join with the users table
    const achievements = await this.prisma.studentAchievement.findMany({
      where: {
        users: {
          enrollmentNumber: enrollmentNo, // Assuming `enrollmentNo` is a field in the users table
        },
      },
      include: {
        users: true, // Include user details if needed
      },
    });

    if (achievements.length === 0) {
      throw new NotFoundException(
        `No achievements found for enrollment number ${enrollmentNo}`,
      );
    }

    return achievements;
  }

  async getAchievementsBySocietyId(societyId: number) {
    const achievements = await this.prisma.studentAchievement.findMany({
      where: { societyId: societyId },
    });

    if (achievements.length === 0) {
      throw new NotFoundException(
        `No achievements found for society ID ${societyId}`,
      );
    }

    return achievements;
  }

  async removeAchievement(enrollmentNo: number) {
    // Fetch the user by enrollment number to get the userId
    const user = await this.prisma.user.findUnique({
      where: { enrollmentNumber: enrollmentNo },
      select: { userId: true },
    });

    if (!user) {
      throw new NotFoundException(
        `No user found with enrollment number ${enrollmentNo}`,
      );
    }

    // Delete achievements linked to the userId
    const result = await this.prisma.studentAchievement.deleteMany({
      where: { userId: user.userId },
    });

    if (result.count === 0) {
      throw new NotFoundException(
        `No achievements found for enrollment number ${enrollmentNo}`,
      );
    }

    return { message: 'Achievement successfully deleted' };
  }
}
