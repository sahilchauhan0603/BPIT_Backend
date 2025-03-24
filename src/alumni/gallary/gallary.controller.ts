import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Query,
} from '@nestjs/common';
import { GallaryService } from './gallary.service';
import { CreateAlbumDto, UpdateAlbumDto, AddImageDto, UpdateImageDto } from './dto/index';

@Controller('albums')
export class GallaryController {
  constructor(private readonly GallaryService: GallaryService) {}

  // Create an album
  @Post()
  async createAlbum(@Body() dto: CreateAlbumDto) {
    return await this.GallaryService.createAlbum(dto);
  }

  // Get all albums with details and number of images
  @Get()
  async getAllAlbums(@Query('page') page: string = '1') {
    const pageNumber = parseInt(page, 10) || 1;
    return await this.GallaryService.getAllAlbums(pageNumber);
  }

  // Update album details
  @Put(':id')
  async updateAlbum(@Param('id') id: string, @Body() dto: UpdateAlbumDto) {
    const albumId = parseInt(id, 10);
    if (isNaN(albumId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.GallaryService.updateAlbum(albumId, dto);
  }

  // Delete an album (and cascade delete all its images)
  @Delete(':id')
  async deleteAlbum(@Param('id') id: string) {
    const albumId = parseInt(id, 10);
    if (isNaN(albumId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.GallaryService.deleteAlbum(albumId);
  }

  // Add image to an album
  @Post('/images')
  async addImage(@Body() dto: AddImageDto) {
    return await this.GallaryService.addImage(dto);
  }

  // Get all images of an album
  @Get(':id/images')
  async getAlbumImages(@Param('id') id: string) {
    const albumId = parseInt(id, 10);
    if (isNaN(albumId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.GallaryService.getAlbumImages(albumId);
  }

  // update image details
  @Put('/images/:id')
  async updateImage(@Param('id') id: string, @Body() dto: UpdateImageDto) {
    const imageId = parseInt(id, 10);
    if (isNaN(imageId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.GallaryService.updateImage(imageId, dto);
  }
  // Delete a specific image
  @Delete(':albumId/images/:imageId')
  async deleteImage(@Param('albumId') albumId: string, @Param('imageId') imageId: string) {
    const albumIdNum = parseInt(albumId, 10);
    const imageIdNum = parseInt(imageId, 10);
    if (isNaN(albumIdNum) || isNaN(imageIdNum)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.GallaryService.deleteImage(albumIdNum, imageIdNum);
  }

  // Delete all images of an album
  @Delete(':id/images')
  async deleteAllImages(@Param('id') id: string) {
    const albumId = parseInt(id, 10);
    if (isNaN(albumId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.GallaryService.deleteAllImages(albumId);
  }
}
