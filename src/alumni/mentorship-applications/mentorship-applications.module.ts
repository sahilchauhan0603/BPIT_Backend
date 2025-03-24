import { Module } from '@nestjs/common';
import { MentorshipApplicationsService } from './mentorship-applications.service';
import { MentorshipApplicationsController } from './mentorship-applications.controller';

@Module({
  providers: [MentorshipApplicationsService],
  controllers: [MentorshipApplicationsController]
})
export class MentorshipApplicationsModule {}
