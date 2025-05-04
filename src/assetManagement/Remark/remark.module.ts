import { Module } from "@nestjs/common";
import { RemarkController } from "./remark.controller";
import { RemarkService } from "./remark.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    imports: [PrismaModule],
    controllers: [RemarkController],
    providers: [RemarkService , PrismaService]
})
export class RemarkModule{}