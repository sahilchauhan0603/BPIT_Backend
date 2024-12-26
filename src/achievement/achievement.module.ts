import { Module } from '@nestjs/common';
import { AchievementController } from './achievement.controller';
import { AchievementService } from './achievement.service';
import { AchievementsModule } from './achievements/achievements.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { RequestsModule } from './requests/requests.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  controllers: [AchievementController],
  providers: [AchievementService],
  imports: [AchievementsModule, AnnouncementsModule, RequestsModule, NotificationsModule]
})
export class AchievementModule {}
