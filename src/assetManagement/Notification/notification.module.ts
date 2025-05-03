import { Module } from "@nestjs/common";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    imports: [PrismaModule],
    controllers: [NotificationController],
    providers: [NotificationService , PrismaService]
})
export class NotificationModule{}