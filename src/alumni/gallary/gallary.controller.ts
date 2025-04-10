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
    let albumId : bigint
    try {
      albumId = BigInt(id)
    } catch (error) {
      throw new BadRequestException('Invalid album id')
    }
    return await this.GallaryService.updateAlbum(albumId, dto);
  }

  // Delete an album (and cascade delete all its images)
  @Delete(':id')
  async deleteAlbum(@Param('id') id: string) {
    let albumId : bigint
    try {
      albumId = BigInt(id)
    } catch (error) {
      throw new BadRequestException('Invalid album id')
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
    let albumId : bigint
    try {
      albumId = BigInt(id)
    } catch (error) {
      throw new BadRequestException('Invalid album id')
    }
    return await this.GallaryService.getAlbumImages(albumId);
  }

  // update image details
  @Put('/images/:id')
  async updateImage(@Param('id') id: string, @Body() dto: UpdateImageDto) {
    let imageId : bigint
    try {
      imageId = BigInt(id)
    } catch (error) {
      throw new BadRequestException('Invalid image id')
    }
    return await this.GallaryService.updateImage(imageId, dto);
  }
  // Delete a specific image
  @Delete(':albumId/images/:imageId')
  async deleteImage(@Param('albumId') albumId: string, @Param('imageId') imageId: string) {
    let albumIdNum : bigint
    let imageIdNum : bigint
    try {
      albumIdNum = BigInt(albumId)
      imageIdNum = BigInt(imageId)
    } catch (error) {
      throw new BadRequestException('Invalid album or image id')
    }
    return await this.GallaryService.deleteImage(albumIdNum, imageIdNum);
  }

  // Delete all images of an album
  @Delete(':id/images')
  async deleteAllImages(@Param('id') id: string) {
    let albumId : bigint
    try {
      albumId = BigInt(id)
    } catch (error) {
      throw new BadRequestException('Invalid album id')
    }
    return await this.GallaryService.deleteAllImages(albumId);
  }
}
