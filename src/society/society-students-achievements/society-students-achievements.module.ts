import { Module } from '@nestjs/common';
import { StudentAchievementService } from './society-students-achievements.service';
import { StudentAchievementController } from './society-students-achievements.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [StudentAchievementService, PrismaService],
  controllers: [StudentAchievementController],
})
export class SocietyStudentsAchievementsModule {}
