import { Module } from "@nestjs/common";
import { IssueController } from "./issue.controller";
import { IssueService } from "./issue.service";
import { PrismaService } from "src/prisma-client/prisma.service";


@Module({
    controllers: [IssueController],
    providers: [IssueService , PrismaService],
})
export class IssueModule {}