import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateInterviewExperienceDto,
  UpdateInterviewExperienceDto,
} from './dto/index';
import { handleError, isPrismaError } from '../helper/exception.helper';

@Injectable()
export class InterviewExperienceService {
  constructor(private prisma: PrismaService) {}

  // Create a new interview experience
  async create(dto: CreateInterviewExperienceDto) {
    try {
      const interviewExperience = await this.prisma.interviewExperience.create({
        data: dto,
      });

      return {
        status: 'success',
        item: interviewExperience,
        message: 'Interview experience created successfully',
      };
    } catch (error) {
      handleError(error);
    }
  }

  // Get all approved interview experiences
  async findAll(page:number, role?: string) {
    try {
      const whereClause: any = { isApproved: true };

      if (role === 'ALUMNI') {
        whereClause.user = { role: 'ALUMNI' };
      } else if (role === 'STUDENT') {
        whereClause.user = { role: 'STUDENT' };
      }
      const interviewExperiences =
        await this.prisma.interviewExperience.findMany({
          where: whereClause,
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                passingYear: true,
                branch: true,
                section: true,
                email: true,
              },
            },
          },
          skip: (page-1)*10,
          take: 10,
        });
        const count = await this.prisma.interviewExperience.count({
          where: whereClause,
        });
      return { status: 'success', items: interviewExperiences,
        meta: {
          totalItems: count,
          currentPage: page,
          totalPages: Math.ceil(count/10),
          itemsPerPage: 10,
        }
       };
    } catch (error) {
      handleError(error);
    }
  }

  // Get an interview experience by ID
  async findOne(id: number) {
    try {
      const interviewExperience =
        await this.prisma.interviewExperience.findUnique({
          where: { interviewExperienceId: id },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                passingYear: true,
                branch: true,
                section: true,
                email: true,
              },
            },
          },
        });

      if (!interviewExperience) {
        throw new HttpException(
          { status: 'error', message: 'Interview experience not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      return { status: 'success', item: interviewExperience };
    } catch (error) {
      handleError(error);
    }
  }

  // Get all interview experiences by user ID (approved and non-approved)
  async findByUserId(userId: number, page: number) {
    try {
      const interviewExperiences =
        await this.prisma.interviewExperience.findMany({
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
              },
            },
          },
          skip: (page - 1) * 10,
          take: 10,
        });
        const totalInterviewExperiences = await this.prisma.interviewExperience.count({
          where: { userId: userId },
        });
        return { status: 'success', items: interviewExperiences,
          meta: {
            totalItems: totalInterviewExperiences,
            totalPages: Math.ceil(totalInterviewExperiences / 10),
            currentPage: page,
            itemsPerPage: 10,
          }
         };
    } catch (error) {
      handleError(error);
    }
  }

  // Update an interview experience by ID
  async update(id: number, dto: UpdateInterviewExperienceDto) {
    try {
      const updatedInterviewExperience =
        await this.prisma.interviewExperience.update({
          where: { interviewExperienceId: id },
          data: dto,
        });

      return {
        status: 'success',
        item: updatedInterviewExperience,
        message: 'Interview experience updated successfully',
      };
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'Interview experience not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }

  // Delete an interview experience by ID
  async remove(id: number) {
    try {
      const deletedInterviewExperience =
        await this.prisma.interviewExperience.delete({
          where: { interviewExperienceId: id },
        });

      return {
        status: 'success',
        item: deletedInterviewExperience,
        message: 'Interview experience deleted successfully',
      };
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'Interview experience not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }
}
