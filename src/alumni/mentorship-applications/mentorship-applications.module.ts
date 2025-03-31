import { Module } from '@nestjs/common';
import { MentorshipApplicationsService } from './mentorship-applications.service';
import { MentorshipApplicationsController } from './mentorship-applications.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [MentorshipApplicationsService, PrismaService],
  controllers: [MentorshipApplicationsController]
})
export class MentorshipApplicationsModule {}
