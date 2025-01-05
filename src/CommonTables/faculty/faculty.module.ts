import { Module } from '@nestjs/common';
import { FacultyController } from './faculty.controller';
import { FacultyService } from './faculty.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FacultyController],
  providers: [FacultyService, PrismaService],
})
export class FacultyModule {}
