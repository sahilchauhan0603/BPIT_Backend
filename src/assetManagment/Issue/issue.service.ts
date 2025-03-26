// import { Injectable } from "@nestjs/common";
// import { PrismaService } from "src/prisma-client/prisma.service";
// import { Issue } from "src/IssueModel/issue.model";

// @Injectable()
// export class IssueService {
//     constructor(private prisma: PrismaService) {}

//     async getAllIssue(): Promise<Issue[]>{
//         return this.prisma.issue.findMany();
//     }

//     async getIssueById(id: number): Promise<Issue | null> {
//         return this.prisma.issue.findUnique({ where: { id : Number(id)} });
//     }

//     async createIssue(data: Issue): Promise<Issue> {
//         return this.prisma.issue.create({ 
//             data, 
//         });
//     }

//     async updateIssue(id: number, data: Issue): Promise<Issue> {
//         return this.prisma.issue.update({
//             where: { id: Number(id) },
//             data,
//         })
//     }
// }