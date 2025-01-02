import { Module } from '@nestjs/common';
import { InterviewExperienceController } from './interview-experience.controller';
import { InterviewExperienceService } from './interview-experience.service';

@Module({
  controllers: [InterviewExperienceController],
  providers: [InterviewExperienceService],
})
export class InterviewExperienceModule {}
