import { Module } from '@nestjs/common';
import { NewsController } from './society-news.controller';
import { NewsService } from './society-news.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [NewsController],
  providers: [NewsService, PrismaService],
})
export class SocietyNewsModule {}
