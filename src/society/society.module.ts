import { Module } from '@nestjs/common';
import { SocietyService } from './society.service';
import { SocietyController } from './society.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { SocietyFunctionsModule } from './societyFunctions/societyFunctions.module';
import { SocietyStudentsModule } from './society-students/society-students.module';
import { SocietyAchievementsModule } from './society-achievements/society-achievements.module';
import { SocietyEventsModule } from './society-events/society-events.module';
import { SocietysocietyEventsController } from './societysociety-events/societysociety-events.controller';

@Module({
  providers: [SocietyService, PrismaService],
  controllers: [SocietyController, SocietysocietyEventsController],
  imports: [
    SocietyFunctionsModule,
    SocietyStudentsModule,
    SocietyAchievementsModule,
    SocietyEventsModule,
  ],
})
export class SocietyModule {}
