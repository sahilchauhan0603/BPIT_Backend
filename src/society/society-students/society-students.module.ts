import { Module } from '@nestjs/common';
import { SocietyStudentsController } from './society-students.controller';
import { SocietyStudentsService } from './society-students.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SocietyStudentsController],
  providers: [SocietyStudentsService, PrismaService],
})
export class SocietyStudentsModule {}
