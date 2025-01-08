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

@Module({
  providers: [SocietyService, PrismaService],
  controllers: [SocietyController],
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
