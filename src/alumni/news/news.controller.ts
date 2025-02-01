import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto, UpdateNewsDto } from './dto/index';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  async create(@Body() dto: CreateNewsDto) {
    return await this.newsService.create(dto);
  }

  @Get()
  async findAll(@Query('page') page: string = '1') {
    const pageNumber = parseInt(page, 10) || 1;
    return await this.newsService.findAll(pageNumber);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const newsId = parseInt(id, 10);
    if (isNaN(newsId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.newsService.findById(newsId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateNewsDto) {
    const newsId = parseInt(id, 10);
    if (isNaN(newsId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.newsService.update(newsId, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const newsId = parseInt(id, 10);
    if (isNaN(newsId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.newsService.delete(newsId);
  }
}
