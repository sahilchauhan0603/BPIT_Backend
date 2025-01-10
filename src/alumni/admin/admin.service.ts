import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError, isPrismaError } from '../helper/exception.helper';
import { Status } from 'src/achievement/achievements/enum';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  // Fetch Interview Experiences (approved/unapproved)
  async getInterviewExperiences(isApproved: boolean, role?: string) {
    try {
      const whereClause: any = { isApproved };
      if (role) {
        whereClause.user = { role };
      }

      const experiences = await this.prisma.interviewExperience.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              passingYear: true,
              role: true,
              branch: true,
              section: true,
              email: true,
              mobile: true,
              githubProfileUrl: true,
              linkedInProfileUrl: true,
              instagramProfileUrl: true,
            },
          },
        },
      });

      return { status: 'success', items: experiences };
    } catch (error) {
      handleError(error);
    }
  }

  // Fetch Professional Information (approved/unapproved)
  async getProfessionalInformation(isApproved: boolean, role?: string) {
    try {
      const whereClause: any = { isApproved };
      if (role) {
        whereClause.user = { role };
      }

      const professionalInfo =
        await this.prisma.professionalInformation.findMany({
          where: whereClause,
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                passingYear: true,
                role: true,
                branch: true,
                section: true,
                email: true,
                mobile: true,
                githubProfileUrl: true,
                linkedInProfileUrl: true,
                instagramProfileUrl: true,
              },
            },
          },
        });

      return { status: 'success', items: professionalInfo };
    } catch (error) {
      handleError(error);
    }
  }

  // Fetch Users by approval status and role
  async getUsers(isApproved: boolean, role?: string) {
    try {
      const query: any = { where: { isApproved } };
      if (role) {
        query.where.role = role;
      }

      const users = await this.prisma.user.findMany(query);
      return { status: 'success', items: users };
    } catch (error) {
      handleError(error);
    }
  }

  // Approve Interview Experience
  async handleInterviewExperienceApproval(id: number, isApproved: boolean) {
    try {
      if (isApproved) {
        const updated = await this.prisma.interviewExperience.update({
          where: { interviewExperienceId: id },
          data: { isApproved: true },
        });
        return {
          status: 'success',
          item: updated,
          message: 'Approved successfully',
        };
      } else {
        await this.prisma.interviewExperience.delete({
          where: { interviewExperienceId: id },
        });
        return {
          status: 'success',
          message: 'Rejected and removed successfully',
        };
      }
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'Interview Experience not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }

  // Approve Professional Information
  async handleProfessionalInformationApproval(id: number, isApproved: boolean) {
    try {
      if (isApproved) {
        const updated = await this.prisma.professionalInformation.update({
          where: { professionalInformationId: id },
          data: { isApproved: true },
        });
        return {
          status: 'success',
          item: updated,
          message: 'Approved successfully',
        };
      } else {
        await this.prisma.professionalInformation.delete({
          where: { professionalInformationId: id },
        });
        return {
          status: 'success',
          message: 'Rejected and removed successfully',
        };
      }
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'Professional Information not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }

  // Approve User
  async handleUserApproval(id: number, isApproved: boolean) {
    try {
      if (isApproved) {
        const updated = await this.prisma.user.update({
          where: { userId: id },
          data: { isApproved: true },
        });
        return {
          status: 'success',
          item: updated,
          message: 'User approved successfully',
        };
      } else {
        await this.prisma.user.delete({
          where: { userId: id },
        });
        return {
          status: 'success',
          message: 'User rejected and removed successfully',
        };
      }
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'User not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }

  // get All Achievements 
  async getAchievements(STATUS: string, role?: string) {
    try {
      const whereClause: any = { status : STATUS };
      if (role) {
        whereClause.user = { role };
      }

      const Achievements =
        await this.prisma.achievement.findMany({
          where: whereClause,
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                passingYear: true,
                role: true,
                branch: true,
                section: true,
                email: true,
                mobile: true,
                enrollmentNumber: true,
                githubProfileUrl: true,
                linkedInProfileUrl: true,
                instagramProfileUrl: true,
              },
            },
          },
        });

      return { status: 'success', items: Achievements };
    } catch (error) {
      handleError(error);
    }
  }
  // Handle Accepted/Rejected state of Achievement
  async handleAchievementApproval(id: number, isStatus: string) {
    try {
      if (isStatus = Status.ACCEPTED) {
        const updated = await this.prisma.achievement.update({
          where: { achievementId: id },
          data: { status: Status.ACCEPTED },
        });
        return {
          status: 'success',
          item: updated,
          message: 'Achievement approved successfully',
        };
      } else if(isStatus = Status.REJECTED) {
        await this.prisma.achievement.delete({
          where: { achievementId: id },
        });
        return {
          status: 'success',
          message: 'Achievement rejected and removed successfully',
        };
      }
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'User not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }
}
