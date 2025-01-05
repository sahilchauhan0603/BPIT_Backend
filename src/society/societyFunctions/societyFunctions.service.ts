import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddSocietyDto } from './dto';
import { EditSocietyDTO } from './dto';

@Injectable()
export class SocietyService {
  constructor(private prisma: PrismaService) {}

  async addSociety(dto: AddSocietyDto) {
    // Directly create a new society
    const newSociety = await this.prisma.societyProfile.create({
      data: {
        societyId: dto.societyId,
        societyType: dto.societyType,
        societyName: dto.societyName,
        societyHead: dto.societyHead,
        dateOfRegistration: dto.dateOfRegistration,
        societyDescription: dto.societyDescription,
        societyImage: dto.societyImage,
        societyEmail: dto.societyEmail,
        societyHeadMobile: dto.societyHeadMobile,
        societyWebsite: dto.societyWebsite,
        isApproved: false, // Default value for approval status
      },
    });
    // Return a success response with the newly created society
    return {
      status: 'success',
      item: newSociety,
      message: 'Society added successfully',
    };
  }

  async updateSociety(societyId: number, dto: EditSocietyDTO) {
    // Find the society using the provided ID
    const society = await this.prisma.societyProfile.findUnique({
      where: { societyId },
    });
    // Check if the society exists
    if (!society) {
      return { status: 'error', message: 'Society not found!' };
    }
    // Update the society with the provided data
    const updatedSociety = await this.prisma.societyProfile.update({
      where: {
        societyId,
      },
      data: {
        societyId: dto.societyId,
        societyType: dto.societyType,
        societyName: dto.societyName,
        societyHead: dto.societyHead,
        dateOfRegistration: dto.dateOfRegistration,
        societyDescription: dto.societyDescription,
        societyImage: dto.societyImage,
        societyEmail: dto.societyEmail,
        societyHeadMobile: dto.societyHeadMobile,
        societyWebsite: dto.societyWebsite,
        isApproved: false, // Default value for approval status
      },
    });

    // Return a success response with the updated society
    return {
      status: 'success',
      item: updatedSociety,
      message: 'Society updated successfully',
    };
  }

  async fetchAllSocieties() {
    return await this.prisma.societyProfile.findMany({
      select: {
        societyId: true,
        societyType: true,
        societyName: true,
        societyDescription: true,
        societyImage: true,
      },
      orderBy: { societyId: 'asc' },
    });
  }

  async fetchSocietyById(id: number) {
    return await this.prisma.societyProfile.findMany({
      where: { societyId: id },
      include: {
        testimonials: true,
        events: true,
        users: true,
        gallery: true,
        news: true,
      },
    });
  }

  async removeSocietyById(id: number) {
    return await this.prisma.societyProfile.delete({
      where: { societyId: id },
    });
  }
}
