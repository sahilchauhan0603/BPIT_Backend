import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

@Injectable()
export class GalleryService {
  constructor(private readonly prisma: PrismaService) {}

  async createGallery(createGalleryDto: CreateGalleryDto) {
    return this.prisma.gallary.create({
      data: createGalleryDto,
    });
  }

  async getAllGalleries() {
    return this.prisma.gallary.findMany({
      orderBy: { createdAt: 'asc' },
      select: {
        societyId: true,
        gallaryId: true,
        imageUrl: true,
      },
    });
  }

  async getGalleryBySociety(societyId: number) {
    return this.prisma.gallary.findMany({
      where: { societyId },
      select: {
        societyId: true,
        gallaryId: true,
        imageUrl: true,
      },
    });
  }

  async getGalleryAdminBySociety(societyId: number) {
    return this.prisma.gallary.findMany({
      where: { societyId },
      select: {
        imageUrl: true,
        society: {
          select: {
            societyName: true,
          },
        },
      },
    });
  }

  async updateGallery(galleryId: number, updateGalleryDto: UpdateGalleryDto) {
    const gallery = await this.prisma.gallary.findUnique({
      where: { gallaryId: galleryId },
    });

    if (!gallery) {
      throw new NotFoundException(`Gallery with ID ${galleryId} not found`);
    }

    return this.prisma.gallary.update({
      where: { gallaryId: galleryId },
      data: updateGalleryDto,
    });
  }

  async deleteGallery(galleryId: number) {
    const gallery = await this.prisma.gallary.findUnique({
      where: { gallaryId: galleryId },
    });

    if (!gallery) {
      throw new NotFoundException(`Gallery with ID ${galleryId} not found`);
    }

    return this.prisma.gallary.delete({
      where: { gallaryId: galleryId },
    });
  }

  async deleteGalleryBySocietyId(societyId: number) {
    return this.prisma.gallary.deleteMany({
      where: { societyId },
    });
  }
}
