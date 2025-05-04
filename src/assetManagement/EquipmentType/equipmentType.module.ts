import { Module } from "@nestjs/common";
import { EquipmentTypeController } from "./equipmentType.controller";
import { EquipmentTypeService } from "./equipmentType.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    imports: [PrismaModule],
    controllers: [EquipmentTypeController],
    providers: [EquipmentTypeService , PrismaService]
})
export class EquipmentTypeModule{}