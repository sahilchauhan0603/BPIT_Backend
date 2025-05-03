import { Controller, Get , Post , Body, Put ,Param, ParseIntPipe} from "@nestjs/common";
import { IssueService } from "./issue.service";
import { Prisma } from "@prisma/client";

@Controller("/assetManagement/issue")
export class IssueController{
    constructor(private readonly issueService: IssueService){}
    @Get()
    getallIssue(){
        return this.issueService.getAllIssue()
    }

    @Post()
    createIssue(@Body() body: Prisma.IssueCreateInput){
        return this.issueService.createIssue(body);
    }

    @Put(":id")
    updateEquipment(@Param("id", ParseIntPipe) id: number, @Body() body:Prisma.IssueUpdateInput){
        return this.issueService.updateIssue(id , body)
    }

    @Get(":id")
    getIssuebyId(@Param("id", ParseIntPipe) id: number){
        return this.issueService.getIssuebyId(id)
    }
}