import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateProfessionalInformationDto,
  UpdateProfessionalInformationDto,
} from './dto/index';
import { handleError, isPrismaError } from '../helper/exception.helper';

@Injectable()
export class ProfessionalInformationService {
  constructor(private prisma: PrismaService) {}

  // Create a new professional information entry
  async create(dto: CreateProfessionalInformationDto) {
    try {
      const professionalInfo = await this.prisma.professionalInformation.create(
        {
          data: dto,
        },
      );

      return {
        status: 'success',
        item: professionalInfo,
        message: 'Professional information created successfully',
      };
    } catch (error) {
      handleError(error);
    }
  }

  // Get all professional information entries (approved only)
  async findAll() {
    try {
      const professionalInfos =
        await this.prisma.professionalInformation.findMany({
          where: { isApproved: true },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                branch: true,
                passingYear: true,
                section: true,
                email: true,
                githubProfileUrl: true,
                linkedInProfileUrl: true,
              },
            },
          },
        });
      return { status: 'success', items: professionalInfos };
    } catch (error) {
      handleError(error);
    }
  }

  // Get professional information by ID
  async findOne(id: number) {
    try {
      const professionalInfo =
        await this.prisma.professionalInformation.findUnique({
          where: { professionalInformationId: id },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                branch: true,
                passingYear: true,
                section: true,
                email: true,
                githubProfileUrl: true,
                linkedInProfileUrl: true,
              },
            },
          },
        });

      if (!professionalInfo) {
        throw new HttpException(
          { status: 'error', message: 'Professional information not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      return { status: 'success', item: professionalInfo };
    } catch (error) {
      handleError(error);
    }
  }

  // Get all professional information for a user
  async findAllByUserId(userId: number) {
    try {
      const professionalInfos =
        await this.prisma.professionalInformation.findMany({
          where: { userId },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                branch: true,
                passingYear: true,
                section: true,
                email: true,
                githubProfileUrl: true,
                linkedInProfileUrl: true,
              },
            },
          },
        });
      return { status: 'success', items: professionalInfos };
    } catch (error) {
      handleError(error);
    }
  }

  // Get the current company of a user
  async findCurrentCompanyByUserId(userId: number) {
    try {
      // First, find the current company where endDate is null
      let currentCompany = await this.prisma.professionalInformation.findFirst({
        where: { userId, endDate: null },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              branch: true,
              passingYear: true,
              section: true,
              email: true,
              githubProfileUrl: true,
              linkedInProfileUrl: true,
            },
          },
        },
      });
      // If no current company is found, find the most recent past company
      if (!currentCompany) {
        currentCompany = await this.prisma.professionalInformation.findFirst({
          where: { userId },
          orderBy: { endDate: 'desc' },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                branch: true,
                passingYear: true,
                section: true,
                email: true,
                githubProfileUrl: true,
                linkedInProfileUrl: true,
              },
            },
          },
        });
      } // If no company is found at all, throw an exception
      if (!currentCompany) {
        throw new HttpException(
          { status: 'error', message: 'Current or past company not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      return { status: 'success', item: currentCompany };
    } catch (error) {
      handleError(error);
    }
  }

  // Update professional information by ID
  async update(id: number, dto: UpdateProfessionalInformationDto) {
    try {
      const updatedProfessionalInfo =
        await this.prisma.professionalInformation.update({
          where: { professionalInformationId: id },
          data: dto,
        });

      return {
        status: 'success',
        item: updatedProfessionalInfo,
        message: 'Professional information updated successfully',
      };
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'Professional information not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }

  // Delete professional information by ID
  async remove(id: number) {
    try {
      const deletedProfessionalInfo =
        await this.prisma.professionalInformation.delete({
          where: { professionalInformationId: id },
        });

      return {
        status: 'success',
        item: deletedProfessionalInfo,
        message: 'Professional information deleted successfully',
      };
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'Professional information not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }
}
