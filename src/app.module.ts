import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { PrismaModule } from './prisma/prisma.module';
import { SocietyModule } from './society/society.module';
import { AchievementModule } from './achievement/achievement.module';
import { AlumniModule } from './alumni/alumni.module';
import { FacultyModule } from './CommonTables/faculty/faculty.module';
import { MailServiceModule } from './mail-service/mail-service.module';
import { AssetManagementModule } from './assetManagement/AssetManagement.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    SocietyModule,
    AchievementModule,
    AlumniModule,
    FacultyModule,
    MailServiceModule,
    AssetManagementModule,
    AuthModule
  ],
})
export class AppModule {}
