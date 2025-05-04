import { Module } from "@nestjs/common";
import { RoomController } from "./room.controller";
import { RoomService } from "./room.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    imports: [PrismaModule],
    controllers: [RoomController],
    providers: [RoomService , PrismaService]
})
export class RoomModule{}