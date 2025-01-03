import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobPostingDto, UpdateJobPostingDto } from './dto/index';
import { handleError, isPrismaError } from "../helper/exception.helper";

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  // Create a new job posting
  async create(dto: CreateJobPostingDto) {
    try {
      const jobPosting = await this.prisma.jobsPosting.create({
        data: dto,
      });

      return {
        status: 'success',
        item: jobPosting,
        message: 'Job posting created successfully',
      };
    } catch (error) {
      handleError(error);
    }
  }

  // Get all job postings with associated user data
  async findAll() {
    try {
      const jobPostings = await this.prisma.jobsPosting.findMany({
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              passingYear: true,
              branch: true,
              userId: true,
            },
          },
        },
      });
      return { status: 'success', items: jobPostings };
    } catch (error) {
      handleError(error);
    }
  }

  // Get a job posting by ID with associated user data
  async findOne(id: number) {
    try {
      const jobPosting = await this.prisma.jobsPosting.findUnique({
        where: { jobsPostingId: id },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              passingYear: true,
              branch: true,
              userId: true,
            },
          },
        },
      });

      if (!jobPosting) {
        throw new HttpException(
          { status: 'error', message: 'Job posting not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      return { status: 'success', item: jobPosting };
    } catch (error) {
      handleError(error);
    }
  }

  // Get all job postings by user ID
  async findByUserId(userId: number) {
    try {
      const jobPostings = await this.prisma.jobsPosting.findMany({
        where: { userId: userId },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              passingYear: true,
              branch: true,
              userId: true,
            },
          },
        },
      });
      return jobPostings;
    } catch (error) {
      handleError(error);
    }
  }

  // Update job posting
  async update(id: number, dto: UpdateJobPostingDto) {
    try {
      const updatedJobPosting = await this.prisma.jobsPosting.update({
        where: { jobsPostingId: id },
        data: dto,
      });

      return {
        status: 'success',
        item: updatedJobPosting,
        message: 'Job posting updated successfully',
      };
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'Job posting not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }

  // Delete a job posting
  async remove(id: number) {
    try {
      const deletedJobPosting = await this.prisma.jobsPosting.delete({
        where: { jobsPostingId: id },
      });

      return {
        status: 'success',
        item: deletedJobPosting,
        message: 'Job posting deleted successfully',
      };
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'Job posting not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }
}
