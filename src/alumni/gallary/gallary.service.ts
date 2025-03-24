import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto, AddImageDto, UpdateImageDto } from './dto/index';
import { handleError, isPrismaError } from '../helper/exception.helper';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GallaryService {
  constructor(private readonly prisma: PrismaService) {}

  async createAlbum(dto: CreateAlbumDto) {
    try {
      const gallery = await this.prisma.album.create({ data: dto });
      return {
        status: 'success',
        item: gallery,
        message: 'Album created successfully',
      };
    } catch (error) {
      handleError(error);
    }
  }

  async getAllAlbums(page: number) {
    try {
      const albums = await this.prisma.album.findMany({
        include: {
          images: true,
        },
        take: 10,
        skip: (page - 1) * 10,
      });
      const totalImages = await this.prisma.album.count();
      return {
        status: 'success',
        items: albums.map((album) => ({
          ...album,
          totalImages: album.images.length,
        })),
        meta: {
          totalItems: totalImages,
          currentPage: page,
          totalPages: Math.ceil(totalImages / 10),
          itemsPerPage: 10,
        },
      };
    } catch (error) {
      handleError(error);
    }
  }


  async updateAlbum(id: number, dto: UpdateAlbumDto) {
    try {
      const updatedAlbum = await this.prisma.album.update({
        where: { albumId: id },
        data: dto,
      });
      return {
        status: 'success',
        item: updatedAlbum,
        message: 'album item updated successfully',
      };
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'Album item not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }

  async deleteAlbum(id: number) {
    try {
      const deletedGallery = await this.prisma.album.delete({
        where: { albumId: id },
      });
      return {
        status: 'success',
        item: deletedGallery,
        message: 'Album item deleted successfully',
      };
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'Album item not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }

  async addImage(dto: AddImageDto) {
    try {
      const image = await this.prisma.alumniImages.create({ data: dto });
      return {
        status: 'success',
        item: image,
        message: 'Image Added successfully',
      };
    } catch (error) {
      handleError(error);
    }
  }

  async getAlbumImages(albumId: number) {
    try {
      const images = await this.prisma.alumniImages.findMany({
        where: {
          albumId: albumId,
        }
      });
      return {
        status: 'success',
        items: images,
      };
    } catch (error) {
      handleError(error);
    }
  }


  async updateImage(id: number, dto: UpdateImageDto) {
    try {
      const updatedAlbum = await this.prisma.alumniImages.update({
        where: { imageId: id },
        data: dto,
      });
      return {
        status: 'success',
        item: updatedAlbum,
        message: 'Image item updated successfully',
      };
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'Image item not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }

  async deleteImage(id: number,imageId: number) {
    try {
      await this.prisma.alumniImages.delete({
        where: { imageId: id },
      });
      return {
        status: 'success',
        message: 'Image deleted successfully',
      };
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'Album item not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }
  async deleteAllImages(albumId: number) {
    try {
      await this.prisma.alumniImages.deleteMany({
        where: { albumId: albumId },
      });
      return {
        status: 'success',
        message: 'All Images deleted successfully',
      };
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'Album item not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }
}
