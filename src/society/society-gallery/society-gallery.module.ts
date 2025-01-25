import { Module } from '@nestjs/common';
import { GalleryController } from './society-gallery.controller';
import { GalleryService } from './society-gallery.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [GalleryController],
  providers: [GalleryService, PrismaService],
})
export class SocietyGalleryModule {}
