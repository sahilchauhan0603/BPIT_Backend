import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { isPrismaError, handleError } from '../helper/exception.helper'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateMentorshipProgramDto, UpdateMentorshipProgramDto } from './dto/index.dto'
import { MentorType, Prisma } from '@prisma/client';
@Injectable()
export class MentorshipProgramService {
    constructor(private prisma: PrismaService) {}

  // Create a new mentorship program
  async create(dto: CreateMentorshipProgramDto) {
    try {
      const mentorshipProgram = await this.prisma.mentorshipProgram.create({
        data: dto,
      });

      return {
        status: 'success',
        item: mentorshipProgram,
        message: 'Mentorship program created successfully',
      };
    } catch (error) {
      handleError(error);
    }
  }

  // Get all mentorship programs with mentor details
  async findAll(page: number) {
    try {
      const mentorshipPrograms = await this.prisma.mentorshipProgram.findMany({
        include: {
          facultyMentor: {
            select: {
                facultyId: true,
                name: true,
                department: true,
                email: true,
                designation: true,
                phone: true,
                profilePictureUrl: true,
            },
          },
          alumniMentor: {
            select: {
              userId: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        skip: (page - 1) * 10,
        take: 10,
      });

      const totalItems = await this.prisma.mentorshipProgram.count();
      return {
        status: 'success',
        items: mentorshipPrograms,
        meta: {
          totalItems: totalItems,
          totalPages: Math.ceil(totalItems / 10),
          currentPage: page,
          itemsPerPage: 10,
        },
      };
    } catch (error) {
      handleError(error);
    }
  }

  // Get a mentorship program by ID
  async findOne(id: bigint) {
    try {
      const mentorshipProgram = await this.prisma.mentorshipProgram.findUnique({
        where: { id: id },
        include: {
          facultyMentor: {
            select: {
              facultyId: true,
              name: true,
              department: true,
              email: true,
              designation: true,
              phone: true,
              profilePictureUrl: true,
            },
          },
          alumniMentor: {
            select: {
              userId: true,
              firstName: true,
              lastName: true,
              email: true,
              mobile: true,
              passingYear: true,
              profilePictureUrl: true,
            },
          },
        },
      });

      if (!mentorshipProgram) {
        throw new HttpException(
          { status: 'error', message: 'Mentorship program not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      return { status: 'success', item: mentorshipProgram };
    } catch (error) {
      handleError(error);
    }
  }

  // Get all mentorship programs for a particular mentor
  async findByMentor(mentorId: bigint, mentorType: MentorType) {
    try {
        const whereCondition: Prisma.MentorshipProgramWhereInput =
        mentorType === MentorType.FACULTY
          ? { facultyMentorId: mentorId }
          : { alumniMentorId: mentorId };

      const mentorshipPrograms = await this.prisma.mentorshipProgram.findMany({
        where: whereCondition,
        include: {
          facultyMentor: {
            select: {
                facultyId: true,
                name: true,
                department: true,
                email: true,
                designation: true,
                phone: true,
                profilePictureUrl: true,
            },
          },
          alumniMentor: {
            select: {
              userId: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });

      return { status: 'success', items: mentorshipPrograms };
    } catch (error) {
      handleError(error);
    }
  }

  // Update a mentorship program
  async update(id: bigint, dto: UpdateMentorshipProgramDto) {
    try {
      const updatedProgram = await this.prisma.mentorshipProgram.update({
        where: { id: id },
        data: dto,
      });

      return {
        status: 'success',
        item: updatedProgram,
        message: 'Mentorship program updated successfully',
      };
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'Mentorship program not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }

  // Delete a mentorship program
  async remove(id: bigint) {
    try {
      const deletedProgram = await this.prisma.mentorshipProgram.delete({
        where: { id: id },
      });

      return {
        status: 'success',
        item: deletedProgram,
        message: 'Mentorship program deleted successfully',
      };
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'Mentorship program not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }
}
