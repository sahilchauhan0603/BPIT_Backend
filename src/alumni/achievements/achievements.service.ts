import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError, isPrismaError } from '../helper/exception.helper';
import { AddAchievementImageDto, AddAchievemntDto, UpdateAchievementDto, UpdateAchievementImageDto } from './dto/index';

@Injectable()
export class AchievementsService {
    constructor(private prisma: PrismaService) {}
    
    // Create a new Achievement
    async create(dto: AddAchievemntDto) {
        try {
          const achievement = await this.prisma.achievement.create({
            data : dto
          });
    
          return {
            status: 'success',
            item: achievement,
            message: 'achievement created successfully',
          };
        } catch (error) {
          handleError(error);
        }
    }
    
      // Get all approved achievements
      async findAll(page: number,role?: string) {
        try {
          const whereClause: any = { status: 'ACCEPTED' };
    
          if (role === 'ALUMNI') {
            whereClause.user = { role: 'ALUMNI' };
          } else if (role === 'STUDENT') {
            whereClause.user = { role: 'STUDENT' };
          }
          const achievements =
            await this.prisma.achievement.findMany({
              where: whereClause,
              skip: (page-1) * 10,
              take: 10,
              include: {
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                    passingYear: true,
                    branch: true,
                    section: true,
                    email: true,
                    linkedInProfileUrl: true,
                    githubProfileUrl: true,
                    instagramProfileUrl: true
                  },
                },
                images : {
                  select : {
                    imageUrl: true,
                    id: true,
                  }
                }
              },
            });
            const count = await this.prisma.achievement.count({
              where: whereClause
            });
          return { status: 'success', items: achievements,
            meta : {
              totalItems: count,
              totalPages: Math.ceil(count / 10),
              currentPage: page,
              itemsPerPage: 10
            }
           };
        } catch (error) {
          handleError(error);
        }
      }
    
      // Get an interview experience by ID
      async findOne(id: number) {
        try {
          const achievement =
            await this.prisma.achievement.findUnique({
              where: { achievementId: id },
              include: {
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                    enrollmentNumber: true,
                    userId: true,
                    passingYear: true,
                    branch: true,
                    section: true,
                    email: true,
                    linkedInProfileUrl: true,
                    githubProfileUrl: true,
                    instagramProfileUrl: true
                  },
                  
                },
                images : {
                  select : {
                    imageUrl: true,
                    id: true,
                  }
                }
              },
            });
    
          if (!achievement) {
            throw new HttpException(
              { status: 'error', message: 'Achievement not found' },
              HttpStatus.NOT_FOUND,
            );
          }
    
          return { status: 'success', item: achievement };
        } catch (error) {
          handleError(error);
        }
      }
    
      // Get all achievements by user ID (approved and non-approved)
      async findByUserId(userId: number) {
        try {
          const achievements =
            await this.prisma.achievement.findMany({
              where: { userId: userId },
              include: {
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                    passingYear: true,
                    branch: true,
                    section: true,
                    email: true,
                    enrollmentNumber: true,
                    userId: true,
                    linkedInProfileUrl: true,
                    githubProfileUrl: true,
                    instagramProfileUrl: true
                  },
                },
                images: {
                  select : {
                    imageUrl: true,
                    id: true,
                  }
                }
              },
            });
          return achievements;
        } catch (error) {
          handleError(error);
        }
      }
    
      // Update an Achievement by ID
      async update(id: number, dto: UpdateAchievementDto) {
        try {
          const updatedAchievement =
            await this.prisma.achievement.update({
              where: { achievementId: id },
              data: dto,
            });
    
          return {
            status: 'success',
            item: updatedAchievement,
            message: 'Achievement updated successfully',
          };
        } catch (error) {
          if (isPrismaError(error) && error.code === 'P2025') {
            throw new HttpException(
              { status: 'error', message: 'Achievement not found' },
              HttpStatus.NOT_FOUND,
            );
          }
          handleError(error);
        }
      }
    
      // Delete an Achievement by ID
      async remove(id: number) {
        try {
          const deletedAchievement =
            await this.prisma.achievement.delete({
              where: { achievementId: id },
            });
    
          return {
            status: 'success',
            item: deletedAchievement,
            message: 'Achievement deleted successfully',
          };
        } catch (error) {
          if (isPrismaError(error) && error.code === 'P2025') {
            throw new HttpException(
              { status: 'error', message: 'Achievement not found' },
              HttpStatus.NOT_FOUND,
            );
          }
          handleError(error);
        }
      }

      // Add Achievement Image
      async addImage(dto: AddAchievementImageDto) {
        try {
          const achievementImage = await this.prisma.achievementImage.create({
            data : {
              achievementId: dto.achievmentId,
              imageUrl: dto.imageUrl,
            }
          });
    
          return {
            status: 'success',
            item: achievementImage,
            message: 'Achievement Image Added successfully',
          };
        } catch (error) {
          handleError(error);
        }
    }
    
      // Get all Image Related to a achievement
      async findAllImage(id: number) {
        try {
          const achievementImages =
            await this.prisma.achievementImage.findMany({
              where: { achievementId: id }});
          return { status: 'success', items: achievementImages };
        } catch (error) {
          handleError(error);
        }
      }

      // Update Image 
      async updateImage(id: number, dto: UpdateAchievementImageDto) {
        try {
          const updatedAchievementImage =
            await this.prisma.achievementImage.update({
              where: { id : id },
              data: dto,
            });
    
          return {
            status: 'success',
            item: updatedAchievementImage,
            message: 'Achievement Image updated successfully',
          };
        } catch (error) {
          if (isPrismaError(error) && error.code === 'P2025') {
            throw new HttpException(
              { status: 'error', message: 'Achievement Image not found' },
              HttpStatus.NOT_FOUND,
            );
          }
          handleError(error);
        }
      }

      async removeImage(id: number) {
        try {
          const deletedAchievementImage =
            await this.prisma.achievementImage.delete({
              where: { id : id },
            });
    
          return {
            status: 'success',
            item: deletedAchievementImage,
            message: 'Achievement Image deleted successfully',
          };
        } catch (error) {
          if (isPrismaError(error) && error.code === 'P2025') {
            throw new HttpException(
              { status: 'error', message: 'Achievement Image not found' },
              HttpStatus.NOT_FOUND,
            );
          }
          handleError(error);
        }
      }

      async removeImages(id: number){
        try {
          const deletedAchievementImages =
          await this.prisma.achievementImage.deleteMany({
            where: { achievementId : id },
          });
          return {
            status: 'success',
            item: deletedAchievementImages,
            message: 'Achievement Images deleted successfully',
          };
        } catch (error) {
          if (isPrismaError(error) && error.code === 'P2025') {
            throw new HttpException(
              { status: 'error', message: 'Achievement Image not found' },
              HttpStatus.NOT_FOUND,
              );
          }
          handleError(error);
        }
      }

}
