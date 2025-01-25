import { Module } from '@nestjs/common';
import { SocietyTestimonialsService } from './society-students-testimonials.service';
import { SocietyTestimonialsController } from './society-students-testimonials.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [SocietyTestimonialsService, PrismaService],
  controllers: [SocietyTestimonialsController],
})
export class SocietyStudentsTestimonialsModule {}
