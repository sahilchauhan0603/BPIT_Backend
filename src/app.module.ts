import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SocietyModule } from './society/society.module';
import { AchievementModule } from './achievement/achievement.module';
import { SocietyStudentsModule } from './society-students/society-students.module';

@Module({
  imports: [PrismaModule, SocietyModule, AchievementModule, SocietyStudentsModule],
})
export class AppModule {}
