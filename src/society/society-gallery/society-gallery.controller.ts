import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { GalleryService } from './society-gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

@Controller('api/v1')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post('/societyGallery')
  async createGallery(@Body() createGalleryDto: CreateGalleryDto) {
    return this.galleryService.createGallery(createGalleryDto);
  }

  @Get('/societyGallery')
  async getAllGalleries() {
    return this.galleryService.getAllGalleries();
  }

  @Get('/societyGallery/:societyId')
  async getGalleryBySociety(
    @Param('societyId', ParseIntPipe) societyId: number,
  ) {
    const gallery = await this.galleryService.getGalleryBySociety(
      Number(societyId),
    );
    if (!gallery) {
      throw new NotFoundException(
        `Gallery for Society ID ${societyId} not found`,
      );
    }
    return gallery;
  }

  @Get('/admin/societyGallery/:societyId')
  async getGalleryAdmin(@Param('societyId', ParseIntPipe) societyId: number) {
    const gallery = await this.galleryService.getGalleryAdminBySociety(
      Number(societyId),
    );
    if (!gallery) {
      throw new NotFoundException(
        `Gallery for Society ID ${societyId} not found`,
      );
    }
    return gallery;
  }

  @Put('/societyGallery/:galleryId')
  async updateGallery(
    @Param('galleryId', ParseIntPipe) galleryId: number,
    @Body() updateGalleryDto: UpdateGalleryDto,
  ) {
    return this.galleryService.updateGallery(
      Number(galleryId),
      updateGalleryDto,
    );
  }

  @Delete('/societyGallery/:galleryId')
  async deleteGallery(@Param('galleryId', ParseIntPipe) galleryId: number) {
    return this.galleryService.deleteGallery(Number(galleryId));
  }

  @Delete('/societyGallery/society/:societyId')
  async deleteGalleryBySocietyId(
    @Param('societyId', ParseIntPipe) societyId: number,
  ) {
    return this.galleryService.deleteGalleryBySocietyId(Number(societyId));
  }
}
