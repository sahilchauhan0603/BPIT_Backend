import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { NewsService } from './society-news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Controller('api/v1')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post('/societyNews')
  async addNews(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.addNews(createNewsDto);
  }

  @Get('/societyNews')
  async fetchAllNews() {
    return this.newsService.fetchAllNews();
  }

  @Get('/societyNews/:societyId')
  async fetchNewsBySociety(@Param('societyId') societyId: number) {
    return this.newsService.fetchNewsBySociety(Number(societyId));
  }

  @Put('/societyNews/:newsId')
  async updateNews(
    @Param('newsId') newsId: number,
    @Body() updateNewsDto: UpdateNewsDto,
  ) {
    return this.newsService.updateNews(Number(newsId), updateNewsDto);
  }

  @Delete('/societyNews/:newsId')
  async removeNews(@Param('newsId') newsId: number) {
    return this.newsService.removeNews(Number(newsId));
  }

  //ADMIN PANEL
  @Get('/admin/home/societyNews')
  async fetchAllNewsAdminHome() {
    return this.newsService.fetchAllNewsAdminHome();
  }

  @Get('/admin/societyNews')
  async fetchAllNewsAdminNews() {
    return this.newsService.fetchAllNewsAdminNews();
  }

  @Get('/admin/societyNews/:societyId')
  async fetchNewsAdminNews(@Param('societyId') societyId: number) {
    return this.newsService.fetchNewsAdminNews(Number(societyId));
  }
}
