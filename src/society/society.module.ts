import { Module } from '@nestjs/common';
import { SocietyService } from './society.service';
import { SocietyController } from './society.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { SocietyFunctionsModule } from './societyFunctions/societyFunctions.module';
import { SocietyStudentsModule } from './society-students/society-students.module';
import { SocietyAchievementsModule } from './society-achievements/society-achievements.module';
import { SocietyEventsModule } from './society-events/society-events.module';
import { SocietyStudentsAchievementsModule } from './society-students-achievements/society-students-achievements.module';
import { SocietyStudentsTestimonialsModule } from './society-students-testimonials/society-students-testimonials.module';
import { SocietyStudentsMarkingModule } from './society-students-marking/society-students-marking.module';
import { SocietyGalleryModule } from './society-gallery/society-gallery.module';
import { SocietyNewsModule } from './society-news/society-news.module';
import { FeedbackController } from './society-feedback/society-feedback.controller';
import { FeedbackService } from './society-feedback/society-feedback.service';
import { ContactController } from './society-contact-us/society-contact-us.controller';
import { ContactService } from './society-contact-us/society-contact-us.service';
import { BecomeMemberController } from './society-become-member/society-become-member.controller';
import { BecomeMemberService } from './society-become-member/society-become-member.service';
import { CreateSocietyController } from './society-create-society-form/society-create-society-form.controller';
import { CreateSocietyService } from './society-create-society-form/society-create-society-form.service';

@Module({
  providers: [
    SocietyService,
    PrismaService,
    FeedbackService,
    ContactService,
    BecomeMemberService,
    CreateSocietyService,
  ],
  controllers: [
    SocietyController,
    FeedbackController,
    ContactController,
    BecomeMemberController,
    CreateSocietyController,
  ],
  imports: [
    SocietyFunctionsModule,
    SocietyStudentsModule,
    SocietyAchievementsModule,
    SocietyEventsModule,
    SocietyStudentsAchievementsModule,
    SocietyStudentsTestimonialsModule,
    SocietyStudentsMarkingModule,
    SocietyGalleryModule,
    SocietyNewsModule,
  ],
})
export class SocietyModule {}
