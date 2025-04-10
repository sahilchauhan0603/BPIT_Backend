import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobPostingDto, UpdateJobPostingDto } from './dto/index';
import { handleError, isPrismaError } from '../helper/exception.helper';

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
  async findAll(page: number) {
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
        skip: (page - 1) * 10,
        take: 10,
      });
      const totalItems = await this.prisma.jobsPosting.count();
      return {
        status: 'success',
        items: jobPostings,
        meta: {
          totalItems: totalItems,
          totalPages: Math.ceil(totalItems / 10),
          currenPage: page,
          itemsPerPage: 10,
        },
      };
    } catch (error) {
      handleError(error);
    }
  }

  // Get a job posting by ID with associated user data
  async findOne(id: bigint) {
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
  async findByUserId(userId: bigint, page: number) {
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
        skip: (page - 1) * 10,
        take: 10,
      });
      const count = await this.prisma.jobsPosting.count({
        where: { userId: userId },
      });

      return {
        status: 'success',
        items: jobPostings,
        meta: {
          totalItems: count,
          totalPages: Math.ceil(count / 10),
          currentPage: page,
          itemsPerPage: 10,
        },
      };
    } catch (error) {
      handleError(error);
    }
  }

  // Update job posting
  async update(id: bigint, dto: UpdateJobPostingDto) {
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
  async remove(id: bigint) {
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
