// import { Body, Controller, Get, Post, Put } from "@nestjs/common";
// import { IssueService } from "./issue.service";
// import { Issue } from "@prisma/client";
// import { Param, NotFoundException  } from "@nestjs/common";

//  @Controller('api/v1/issue')   
//  export class IssueController{
//     constructor(private issueService: IssueService){}

//     @Get()
//     async getAllIssue(): Promise<Issue[]>{
//         return this.issueService.getAllIssue();
//     }
    
//     @Post()
//     async postIssue(@Body() postData: Issue): Promise<Issue>{
//         return this.issueService.createIssue(postData);
//     }

//     @Get(':id')
//     async getIssue(@Param('id') id: number): Promise<Issue>{
//         const issue = await this.issueService.getIssueById(id);
//         if (!issue) {
//             throw new NotFoundException(`Issue with ID ${id} not found`);
//         }
//         return issue;
//     }

//     @Put(':id')
//     async updateIssue(@Param('id') id: number, @Body() updateData: Issue): Promise<Issue>{
//         return this.issueService.updateIssue(id, updateData);
//     }
//  }