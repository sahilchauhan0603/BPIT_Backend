import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Adjust based on where your Prisma service is located
import { SocietyAchievementsService } from './society-achievements.service';
import { SocietyAchievementsController } from './society-achievements.controller';

@Module({
  imports: [],
  controllers: [SocietyAchievementsController],
  providers: [SocietyAchievementsService, PrismaService],
})
export class SocietyAchievementsModule {}
