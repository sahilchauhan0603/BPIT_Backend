import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GallaryService } from './gallary.service';
import { CreateGalleryDto, UpdateGalleryDto } from './dto/index';

@Controller('gallery')
export class GallaryController {
  constructor(private readonly GallaryService: GallaryService) {}

  @Post()
  async create(@Body() dto: CreateGalleryDto) {
    return await this.GallaryService.create(dto);
  }

  @Get()
  async findAll(@Query('page') page: string = '1' ) {
    const pageNumber = parseInt(page, 10) || 1;
    return await this.GallaryService.findAll(pageNumber);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const gallaryId = parseInt(id, 10);
    if (isNaN(gallaryId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.GallaryService.findById(gallaryId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateGalleryDto) {
    const gallaryId = parseInt(id, 10);
    if (isNaN(gallaryId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.GallaryService.update(gallaryId, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const gallaryId = parseInt(id, 10);
    if (isNaN(gallaryId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.GallaryService.delete(gallaryId);
  }

  @Get('album/img')
  async groupByImageTitle() {
    return await this.GallaryService.groupByImageTitle();
  }

  @Get('album/:title')
  async findByImageTitle(@Param('title') title: string) {
    return await this.GallaryService.findByImageTitle(title);
  }
}
