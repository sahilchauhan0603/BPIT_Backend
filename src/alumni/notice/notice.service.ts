import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoticeDto, UpdateNoticeDto } from './dto/index';
import { handleError, isPrismaError } from '../helper/exception.helper';

@Injectable()
export class NoticeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateNoticeDto) {
    try {
      const notice = await this.prisma.notice.create({ data: dto });
      return {
        status: 'success',
        item: notice,
        message: 'Notice added successfully',
      };
    } catch (error) {
      handleError(error);
    }
  }

  async getAll(page: number) {
    try {
      const notices = await this.prisma.notice.findMany({
        skip: (page - 1) * 10,
        take: 10,
        orderBy: {
          createdAt: 'desc',
        },
      });
      const totalNotices = await this.prisma.user.count();

      return {
        status: 'success',
        items: notices,
        meta: {
          totalItems: totalNotices,
          currentPage: page,
          totalPages: Math.ceil(totalNotices / 10),
          itemsPerPage: 10,
        },
      };
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, Dto: UpdateNoticeDto) {
    try {
      const updatedNotice = await this.prisma.notice.update({
        where: { noticeId: id },
        data: Dto,
      });

      return {
        status: 'success',
        item: updatedNotice,
        message: 'Notice updated successfully',
      };
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'Notice not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const deletedNotice = await this.prisma.notice.delete({
        where: { noticeId: id },
      });

      return {
        status: 'success',
        item: deletedNotice,
        message: 'Notice deleted successfully',
      };
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'Notice not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }
}
