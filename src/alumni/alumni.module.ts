import { Module } from '@nestjs/common';
import { InterviewExperienceModule } from './interview-experience/interview-experience.module';
import { ProfessionalInformationModule } from './professional-information/professional-information.module';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';
import { AlumniController } from './alumni.controller';
import { AlumniService } from './alumni.service';
import { AdminModule } from './admin/admin.module';


@Module({
  imports: [InterviewExperienceModule, ProfessionalInformationModule, UsersModule, JobsModule, AdminModule],
  controllers: [AlumniController],
  providers: [AlumniService]
})
export class AlumniModule {}
