import { Module } from '@nestjs/common';
import { InterviewExperienceController } from './interview-experience.controller';
import { InterviewExperienceService } from './interview-experience.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [InterviewExperienceController],
  providers: [InterviewExperienceService, PrismaService],
})
export class InterviewExperienceModule {}
