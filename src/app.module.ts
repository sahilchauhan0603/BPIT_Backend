import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SocietyModule } from './society/society.module';
import { AchievementModule } from './achievement/achievement.module';
import { AlumniModule } from './alumni/alumni.module';
import { FacultyModule } from './CommonTables/faculty/faculty.module';
import { MailServiceModule } from './mail-service/mail-service.module';
import { AssetManagementModule } from './assetManagement/AssetManagement.module';

@Module({
  imports: [
    PrismaModule,
    SocietyModule,
    AchievementModule,
    AlumniModule,
    FacultyModule,
    MailServiceModule,
    AssetManagementModule
  ],
})
export class AppModule {}
