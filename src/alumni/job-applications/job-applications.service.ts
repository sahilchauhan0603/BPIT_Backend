import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobApplicationDto, UpdateJobApplicationDto } from './dto/index';
import { handleError, isPrismaError } from '../helper/exception.helper';
import { ApplicationStatus } from '@prisma/client';
@Injectable()
export class JobApplicationsService {
  constructor(private prisma: PrismaService) {}

  // Create a new job application (Ensure job posting is active)
  async create(dto: CreateJobApplicationDto) {
    try {
      const jobPosting = await this.prisma.jobsPosting.findUnique({
        where: { jobsPostingId: dto.jobPostingId },
      });

      if (!jobPosting || !jobPosting.isActive) {
        throw new HttpException(
          { status: 'error', message: 'Job posting is not active or does not exist' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const application = await this.prisma.jobApplication.create({
        data: dto,
      });

      return {
        status: 'success',
        item: application,
        message: 'Job application submitted successfully',
      };
    } catch (error) {
      handleError(error);
    }
  }

  // Get all job applications for a given job posting ID
  async findByJobPostingId(jobPostingId: number) {
    try {
      const applications = await this.prisma.jobApplication.findMany({
        where: { jobPostingId },
        include: { user: {select :{
          userId: true,
          firstName: true,
          lastName: true,
          branch: true,
          passingYear: true,
          email: true,
        }}, jobPosting: true },
      });

      return { status: 'success', items: applications };
    } catch (error) {
      handleError(error);
    }
  }

  // Get all job applications submitted by a user
  async findByUserId(userId: number) {
    try {
      const applications = await this.prisma.jobApplication.findMany({
        where: { userId },
        include: { jobPosting: true },
      });

      return { status: 'success', items: applications };
    } catch (error) {
      handleError(error);
    }
  }

  // Get a specific job application by ID
  async findOne(id: number) {
    try {
      const application = await this.prisma.jobApplication.findUnique({
        where: { jobApplicationId: id },
        include: { user: {select :{
          userId: true,
          firstName: true,
          lastName: true,
          branch: true,
          passingYear: true,
          email: true,
        }}, jobPosting: true },
      });

      if (!application) {
        throw new HttpException(
          { status: 'error', message: 'Job application not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      return { status: 'success', item: application };
    } catch (error) {
      handleError(error);
    }
  }

  // Update a job application (Ensure job posting is still active)
  async update(id: number, dto: UpdateJobApplicationDto) {
    try {
      const application = await this.prisma.jobApplication.findUnique({
        where: { jobApplicationId: id },
        include: { jobPosting: true },
      });

      if (!application) {
        throw new HttpException(
          { status: 'error', message: 'Job application not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      if (!application.jobPosting.isActive) {
        throw new HttpException(
          { status: 'error', message: 'Cannot update application. Job posting is inactive' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const updatedApplication = await this.prisma.jobApplication.update({
        where: { jobApplicationId: id },
        data: dto,
      });

      return { status: 'success', item: updatedApplication, message: 'Application updated successfully' };
    } catch (error) {
      handleError(error);
    }
  }

  // Update job application status
  async updateStatus(id: number, status: string) {
    try {
       // Validate if the status is a valid enum value
        if (!Object.values(ApplicationStatus).includes(status as ApplicationStatus)) {
            throw new HttpException(
            { status: 'error', message: `Invalid status value: ${status}` },
            HttpStatus.BAD_REQUEST,
            );
        }
  
        const updatedApplication = await this.prisma.jobApplication.update({
            where: { jobApplicationId: id },
            data: { status: status as ApplicationStatus }, // Cast to ApplicationStatus
        });

        return { status: 'success', item: updatedApplication, message: 'Application status updated' };
    } catch (error) {
        handleError(error);
    }
  }

  // Delete a job application
  async remove(id: number) {
    try {
      const deletedApplication = await this.prisma.jobApplication.delete({
        where: { jobApplicationId: id },
      });

      return { status: 'success', item: deletedApplication, message: 'Application deleted successfully' };
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'Job application not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }
}
