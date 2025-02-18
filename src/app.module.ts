import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SocietyModule } from './society/society.module';
import { AchievementModule } from './achievement/achievement.module';
import { AlumniModule } from './alumni/alumni.module';
import { FacultyModule } from './CommonTables/faculty/faculty.module';
import { MailServiceModule } from './mail-service/mail-service.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    SocietyModule,
    AchievementModule,
    AlumniModule,
    FacultyModule,
    MailServiceModule,
    AuthModule,
  ],
})
export class AppModule {}
