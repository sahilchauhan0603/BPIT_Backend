import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/index';
import { handleError, isPrismaError } from '../helper/exception.helper';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    try {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          enrollmentNumber: dto.enrollmentNumber,
          email: dto.email,
          mobile: dto.mobile,
        },
      });

      if (existingUser) {
        throw new HttpException(
          { status: 'error', message: 'User already exists!' },
          HttpStatus.CONFLICT,
        );
      }

      const newUser = await this.prisma.user.create({
        data: dto,
      });

      return {
        status: 'success',
        item: newUser,
        message: 'User added successfully',
      };
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(role?: string) {
    try {
      const query: any = {
        where: { isApproved: true },
        include: {
          achievements: true,
          professionalInformations: true,
          interviewExperiences: true,
          eventsAttended: true,
          societyMember: true,
          jobPosting: true,
        },
      };
      if (role) {
        query.where.role = role;
      }
      // Fetch users from the database
      const users = await this.prisma.user.findMany(query);
      return { status: 'success', items: users };
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { userId: id },
        include: {
          achievements: true,
          professionalInformations: true,
          interviewExperiences: true,
          eventsAttended: true,
          societyMember: true,
          jobPosting: true,
        },
      });

      if (!user) {
        throw new HttpException(
          { status: 'error', message: 'User not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      return { status: 'success', item: user };
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, Dto: UpdateUserDto) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { userId: id },
        data: Dto,
      });

      return {
        status: 'success',
        item: updatedUser,
        message: 'User updated successfully',
      };
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

  async remove(id: number) {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: { userId: id },
      });

      return {
        status: 'success',
        item: deletedUser,
        message: 'User deleted successfully',
      };
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
