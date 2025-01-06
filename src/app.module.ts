import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SocietyModule } from './society/society.module';
import { AchievementModule } from './achievement/achievement.module';
import { AlumniModule } from './alumni/alumni.module';
import { FacultyModule } from './CommonTables/faculty/faculty.module';
import { SocietyStudentsAchievementsModule } from './society-students-achievements/society-students-achievements.module';

@Module({
  imports: [
    PrismaModule,
    SocietyModule,
    AchievementModule,
    AlumniModule,
    FacultyModule,
    SocietyStudentsAchievementsModule,
  ],
})
export class AppModule {}
