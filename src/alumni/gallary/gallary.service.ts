import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateGalleryDto, UpdateGalleryDto } from './dto/index';
import { handleError, isPrismaError } from '../helper/exception.helper';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GallaryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGalleryDto) {
    try {
      const gallery = await this.prisma.gallary.create({ data: dto });
      return {
        status: 'success',
        item: gallery,
        message: 'Gallery item created successfully',
      };
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const galleries = await this.prisma.gallary.findMany();
      return { status: 'success', items: galleries };
    } catch (error) {
      handleError(error);
    }
  }

  async findById(id: number) {
    try {
      const gallery = await this.prisma.gallary.findUnique({ where: { gallaryId: id } });
      if (!gallery) {
        throw new HttpException(
          { status: 'error', message: 'Gallery item not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      return { status: 'success', item: gallery };
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, dto: UpdateGalleryDto) {
    try {
      const updatedGallery = await this.prisma.gallary.update({
        where: { gallaryId: id },
        data: dto,
      });
      return {
        status: 'success',
        item: updatedGallery,
        message: 'Gallery item updated successfully',
      };
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'Gallery item not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }

  async delete(id: number) {
    try {
      const deletedGallery = await this.prisma.gallary.delete({ where: { gallaryId: id } });
      return {
        status: 'success',
        item: deletedGallery,
        message: 'Gallery item deleted successfully',
      };
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'Gallery item not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }

  async groupByImageTitle() {
    try {
      const groupedImages = await this.prisma.gallary.groupBy({
        by: ['imageTitle'],
        _count: true,
        _min: { imageUrl: true },
      });
      return groupedImages.map(group => ({
        title: group.imageTitle,
        randomImageUrl: group._min.imageUrl,
        totalCount: group._count,
      }));
    } catch (error) {
      handleError(error);
    }
  }

  async findByImageTitle(title: string) {
    try {
      const images = await this.prisma.gallary.findMany({ where: { imageTitle: title } });
      return { status: 'success', items: images };
    } catch (error) {
      handleError(error);
    }
  }
}
