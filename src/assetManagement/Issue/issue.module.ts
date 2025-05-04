import { Module } from "@nestjs/common";
import { IssueController } from "./issue.controller";
import { IssueService } from "./issue.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    imports: [PrismaModule],
    controllers: [IssueController],
    providers: [IssueService , PrismaService]
})
export class IssueModule{}