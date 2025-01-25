import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateNewsDto, UpdateNewsDto } from './dto/index';
import { handleError, isPrismaError } from '../helper/exception.helper';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateNewsDto) {
    try {
      const news = await this.prisma.news.create({ data: dto });
      return {
        status: 'success',
        item: news,
        message: 'News created successfully',
      };
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const news = await this.prisma.news.findMany({
        where: { isActive: true },
      });
      return { status: 'success', items: news };
    } catch (error) {
      handleError(error);
    }
  }

  async findById(id: number) {
    try {
      const news = await this.prisma.news.findUnique({ where: { newsId: id } });
      if (!news) {
        throw new HttpException(
          { status: 'error', message: 'News not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      return { status: 'success', item: news };
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, dto: UpdateNewsDto) {
    try {
      const updatedNews = await this.prisma.news.update({
        where: { newsId: id },
        data: dto,
      });
      return {
        status: 'success',
        item: updatedNews,
        message: 'News updated successfully',
      };
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'News not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }

  async delete(id: number) {
    try {
      const deletedNews = await this.prisma.news.delete({
        where: { newsId: id },
      });
      return {
        status: 'success',
        item: deletedNews,
        message: 'News deleted successfully',
      };
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'News not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }
}
