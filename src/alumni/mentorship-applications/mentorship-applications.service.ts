import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError, isPrismaError } from '../helper/exception.helper';
import { CreateMentorshipAppicationDto } from './dto/index.dto';
import { ApplStatus, ProgramStatus } from '@prisma/client';

@Injectable()
export class MentorshipApplicationsService {
    constructor(private prisma: PrismaService) {}

  // Create a new job application (Ensure job posting is active)
  async create(dto: CreateMentorshipAppicationDto) {
    try {
      const program = await this.prisma.mentorshipProgram.findUnique({
        where: { id: dto.mentorshipId },
      });

      if (!program || program.status != ProgramStatus.ACTIVE) {
        throw new HttpException(
          { status: 'error', message: 'Program is not active or does not exist' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const application = await this.prisma.mentorshipApplication.create({
        data: dto,
      });

      return {
        status: 'success',
        item: application,
        message: 'mentorship application submitted successfully',
      };
    } catch (error) {
      handleError(error);
    }
  }

  // Get all job applications for a given job posting ID
  async findByProgramId(mentorshipId: bigint) {
    try {
      const applications = await this.prisma.mentorshipApplication.findMany({
        where: { mentorshipId },
        include: { user: {select :{
          userId: true,
          firstName: true,
          lastName: true,
          branch: true,
          passingYear: true,
          email: true,
        }}, mentorship: true },
      });

      return { status: 'success', items: applications };
    } catch (error) {
      handleError(error);
    }
  }

  // Get all job applications submitted by a user
  async findByUserId(userId: bigint) {
    try {
      const applications = await this.prisma.mentorshipApplication.findMany({
        where: { userId },
        include: { mentorship: true },
      });

      return { status: 'success', items: applications };
    } catch (error) {
      handleError(error);
    }
  }

  // Get a specific job application by ID
  async findOne(id: bigint) {
    try {
      const application = await this.prisma.mentorshipApplication.findUnique({
        where: { id: id },
        include: { user: {select :{
          userId: true,
          firstName: true,
          lastName: true,
          branch: true,
          passingYear: true,
          email: true,
        }}, mentorship: true },
      });

      if (!application) {
        throw new HttpException(
          { status: 'error', message: 'Mentorship application not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      return { status: 'success', item: application };
    } catch (error) {
      handleError(error);
    }
  }


  // Update mentorship application status
  async updateStatus(id: bigint, status: string) {
    try {
       // Validate if the status is a valid enum value
        if (!Object.values(ApplStatus).includes(status as ApplStatus)) {
            throw new HttpException(
            { status: 'error', message: `Invalid status value: ${status}` },
            HttpStatus.BAD_REQUEST,
            );
        }
  
        const updatedApplication = await this.prisma.mentorshipApplication.update({
            where: { id: id },
            data: { status: status as ApplStatus }, // Cast to ApplicationStatus
        });

        return { status: 'success', item: updatedApplication, message: 'Application status updated' };
    } catch (error) {
        handleError(error);
    }
  }

  // Delete a job application
  async remove(id: bigint) {
    try {
      const deletedApplication = await this.prisma.mentorshipApplication.delete({
        where: { id: id },
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
