import { Module } from '@nestjs/common';
import { SocietyStudentsAchievementsService } from './society-students-achievements.service';
import { SocietyStudentsAchievementsController } from './society-students-achievements.controller';

@Module({
  providers: [SocietyStudentsAchievementsService],
  controllers: [SocietyStudentsAchievementsController],
})
export class SocietyStudentsAchievementsModule {}
