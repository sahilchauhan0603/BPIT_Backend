import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SocietyModule } from './society/society.module';
import { AchievementModule } from './achievement/achievement.module';

@Module({
  imports: [PrismaModule, SocietyModule, AchievementModule],
})
export class AppModule {}
