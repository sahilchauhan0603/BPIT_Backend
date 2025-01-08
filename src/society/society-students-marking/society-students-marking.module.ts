import { Module } from '@nestjs/common';
import { StudentMarkingController } from './society-students-marking.controller';
import { StudentMarkingService } from './society-students-marking.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [StudentMarkingController],
  providers: [StudentMarkingService, PrismaService],
})
export class SocietyStudentsMarkingModule {}
