import { Module } from '@nestjs/common';
import { SocietyAchievementsController } from './society-achievements.controller';
import { SocietyAchievementsService } from './society-achievements.service';

@Module({
  controllers: [SocietyAchievementsController],
  providers: [SocietyAchievementsService],
})
export class SocietyAchievementsModule {}
