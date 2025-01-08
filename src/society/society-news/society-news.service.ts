import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  async addNews(createNewsDto: CreateNewsDto) {
    return this.prisma.news.create({ data: createNewsDto });
  }

  async fetchAllNews() {
    return this.prisma.news.findMany({
      select: {
        societyId: true,
        newsId: true,
        newsTitle: true,
        newsDescription: true,
        newsDate: true,
        author: true,
        society: {
          select: {
            societyName: true,
          },
        },
      },
    });
  }

  async fetchNewsBySociety(societyId: number) {
    return this.prisma.news.findMany({
      where: { societyId: societyId },
      select: {
        societyId: true,
        newsId: true,
        newsTitle: true,
        newsDescription: true,
        newsDate: true,
        author: true,
        society: {
          select: {
            societyName: true,
          },
        },
      },
    });
  }

  async updateNews(newsId: number, updateNewsDto: UpdateNewsDto) {
    const existingNews = await this.prisma.news.findUnique({
      where: { newsId },
    });

    if (!existingNews) {
      throw new NotFoundException(`News with ID ${newsId} not found`);
    }

    return this.prisma.news.update({
      where: { newsId },
      data: updateNewsDto,
    });
  }

  async removeNews(newsId: number) {
    const existingNews = await this.prisma.news.findUnique({
      where: { newsId },
    });

    if (!existingNews) {
      throw new NotFoundException(`News with ID ${newsId} not found`);
    }

    return this.prisma.news.delete({ where: { newsId } });
  }

  //ADMIN PANEL
  async fetchAllNewsAdminHome() {
    return this.prisma.news.findMany({
      select: {
        newsDate: true,
        author: true,
        newsTitle: true,
      },
    });
  }

  async fetchAllNewsAdminNews() {
    return this.prisma.news.findMany({
      select: {
        societyId: true,
        newsId: true,
        newsTitle: true,
        newsDate: true,
        newsDescription: true,
        author: true,
        society: {
          select: {
            societyName: true,
          },
        },
      },
    });
  }

  async fetchNewsAdminNews(societyId: number) {
    return this.prisma.news.findMany({
      where: { societyId },
      select: {
        societyId: true,
        newsId: true,
        newsTitle: true,
        newsDate: true,
        newsDescription: true,
        author: true,
        society: {
          select: {
            societyName: true,
          },
        },
      },
    });
  }
}
