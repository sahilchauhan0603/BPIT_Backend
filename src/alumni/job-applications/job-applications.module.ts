import { Module } from '@nestjs/common';
import { JobApplicationsController } from './job-applications.controller';
import { JobApplicationsService } from './job-applications.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [JobApplicationsController],
  providers: [JobApplicationsService, PrismaService]
})
export class JobApplicationsModule {}
