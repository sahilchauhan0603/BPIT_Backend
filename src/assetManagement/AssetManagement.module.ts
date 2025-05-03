import { Module } from '@nestjs/common';
import { RoomModule } from './Room/room.module';
import { EquipmentModule } from './Equipment/equipment.module';
import { EquipmentTypeModule } from './EquipmentType/equipmentType.module';
import { RemarkModule } from './Remark/remark.module';
import { NotificationModule } from './Notification/notification.module';
import { IssueModule } from './Issue/issue.module';
import { AssetManagementController } from './AssetManagement.controller';
import { AssetManagementService } from './AssetManagement.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AssetManagementController],
  providers: [AssetManagementService],
  imports: [RoomModule, 
            PrismaModule , 
            EquipmentModule, 
            EquipmentTypeModule , 
            RemarkModule , 
            NotificationModule,
            IssueModule
  ],

})
export class AssetManagementModule {}
