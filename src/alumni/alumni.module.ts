import { Module } from '@nestjs/common';
import { InterviewExperienceModule } from './interview-experience/interview-experience.module';
import { ProfessionalInformationModule } from './professional-information/professional-information.module';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';
import { AlumniController } from './alumni.controller';
import { AlumniService } from './alumni.service';
import { AdminModule } from './admin/admin.module';
import { GallaryModule } from './gallary/gallary.module';
import { NewsModule } from './news/news.module';
import { EventsModule } from './events/events.module';
import { AchievementsModule } from './achievements/achievements.module';
import { NoticeModule } from './notice/notice.module';
import { MailservicesController } from './mailservices/mailservices.controller';
import { MailservicesService } from './mailservices/mailservices.service';

@Module({
  imports: [
    InterviewExperienceModule,
    ProfessionalInformationModule,
    UsersModule,
    JobsModule,
    AdminModule,
    GallaryModule,
    NewsModule,
    EventsModule,
    AchievementsModule,
    NoticeModule,
  ],
  controllers: [AlumniController, MailservicesController],
  providers: [AlumniService, MailservicesService],
})
export class AlumniModule {}
