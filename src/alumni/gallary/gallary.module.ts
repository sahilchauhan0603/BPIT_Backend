import { Module } from '@nestjs/common';
import { GallaryController } from './gallary.controller';
import { GallaryService } from './gallary.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [GallaryController],
  providers: [GallaryService, PrismaService]
})
export class GallaryModule {}
