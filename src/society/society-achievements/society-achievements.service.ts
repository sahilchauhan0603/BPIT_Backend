import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Adjust based on where your Prisma service is located
import { CreateSocietyAchievementDto } from './dto/create-society-achievement.dto';
import { UpdateSocietyAchievementDto } from './dto/update-society-achievement.dto';

@Injectable()
export class SocietyAchievementsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSocietyAchievementDto: CreateSocietyAchievementDto) {
    // Directly create a new society achievement
    const newAchievement = await this.prisma.societyAchievement.create({
      data: {
        societyAchievementId: createSocietyAchievementDto.societyAchievementId,
        societyId: createSocietyAchievementDto.societyId, // Assuming `societyId` exists in the DTO
        title: createSocietyAchievementDto.title, // Assuming `title` exists in the DTO
        description: createSocietyAchievementDto.description,
        dateAchieved: createSocietyAchievementDto.dateAchieved, // Assuming
      },
    });

    // Return a success response with the newly created achievement
    return {
      status: 'success',
      item: newAchievement,
      message: 'Society achievement added successfully',
    };
  }

  async update(
    achievementID: number,
    updateSocietyAchievementDto: UpdateSocietyAchievementDto,
  ) {
    // Check if the achievement exists
    const existingAchievement = await this.prisma.societyAchievement.findUnique(
      {
        where: { societyAchievementId: achievementID }, // Use the correct field name
      },
    );

    if (!existingAchievement) {
      throw new NotFoundException('Achievement not found');
    }

    // Update the achievement with the new data from the DTO
    const updatedAchievement = await this.prisma.societyAchievement.update({
      where: { societyAchievementId: achievementID }, // Use the correct field name
      data: {
        societyAchievementId: updateSocietyAchievementDto.societyAchievementId,
        societyId: updateSocietyAchievementDto.societyId, // Assuming `societyId` is part of the DTO
        title: updateSocietyAchievementDto.title, // Assuming `title` is part of the DTO
        description: updateSocietyAchievementDto.description,
        dateAchieved: updateSocietyAchievementDto.dateAchieved,
      },
    });

    // Return a success response with the updated achievement
    return {
      status: 'success',
      item: updatedAchievement,
      message: 'Society achievement updated successfully',
    };
  }

  async findAll(page: number) {
    const societyAchievement = await this.prisma.societyAchievement.findMany({
      orderBy: { societyAchievementId: 'asc' },
      skip: (page - 1) * 10,
      take: 10,
    });
    const count = await this.prisma.societyAchievement.count({});
    return {
      status: 'success',
      items: societyAchievement,
      meta: {
        totalItems: count,
        totalPages: Math.ceil(count / 10),
        currentPage: page,
        itemsPerPage: 10,
      },
    };
  }

  async findBySocietyID(societyID: number) {
    return this.prisma.societyAchievement.findMany({
      where: { societyId: societyID },
    });
  }

  async removeByAchievementID(
    achievementID: number,
  ): Promise<{ message: string }> {
    // Check if the achievement exists
    const existingAchievement = await this.prisma.societyAchievement.findUnique(
      {
        where: { societyAchievementId: achievementID },
      },
    );

    if (!existingAchievement) {
      throw new NotFoundException('Achievement not found');
    }

    // Delete the achievement
    await this.prisma.societyAchievement.delete({
      where: { societyAchievementId: achievementID },
    });

    // Return success message
    return { message: 'Achievement successfully deleted' };
  }

  async removeBySocietyID(societyID: number) {
    const achievements = await this.prisma.societyAchievement.findMany({
      where: { societyId: societyID },
    });

    if (!achievements.length) {
      throw new NotFoundException('No achievements found for this society');
    }

    await this.prisma.societyAchievement.deleteMany({
      where: { societyId: societyID },
    });

    return { message: 'Achievements successfully deleted for the society' };
  }
}
