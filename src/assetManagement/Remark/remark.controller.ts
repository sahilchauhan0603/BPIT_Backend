import { Controller, Get , Post , Body, Put ,Param, ParseIntPipe} from "@nestjs/common";
import { RemarkService } from "./remark.service";
import { Prisma } from "@prisma/client";

@Controller("/assetManagement/remark")
export class RemarkController{
    constructor(private readonly remarkService: RemarkService){}
    @Get()
    getallRemark(){
        return this.remarkService.getAllRemarks()
    }

    @Post()
    createRemark(@Body() body: Prisma.RemarksCreateInput){
        return this.remarkService.createRemark(body);
    }

    @Put(":id")
    updateRemark(@Param("id", ParseIntPipe) id: number, @Body() body:Prisma.RemarksUpdateInput){
        return this.remarkService.updateRemark(id , body)
    }

    @Get(":id")
    getRemarkbyId(@Param("id", ParseIntPipe) id: number){
        return this.remarkService.getRemarkbyId(id)
    }
}