import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class IssueService{
    constructor(private readonly prisma: PrismaService){}
    //fetching equipment info
    getAllIssue(){
        return this.prisma.issue.findMany();
    }

    createIssue(body: Prisma.IssueCreateInput){
        return this.prisma.issue.create({
            data:body
        });
    }

    updateIssue(issueId: number , body: Prisma.IssueUpdateInput){
        return this.prisma.issue.update({where: { issueId }, data: body},)
    }
    getIssuebyId(issueId: number ){
        return this.prisma.issue.findUnique({where: { issueId }})
    }
    
    
}