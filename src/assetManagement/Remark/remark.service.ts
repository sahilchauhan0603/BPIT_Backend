import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RemarkService{
    constructor(private readonly prisma: PrismaService){}
    //fetching equipment info
    getAllRemarks(){
        return this.prisma.remarks.findMany();
    }

    createRemark(body: Prisma.RemarksCreateInput){
        return this.prisma.remarks.create({
            data:body
        });
    }

    updateRemark(remarkId: number , body: Prisma.RemarksUpdateInput){
        return this.prisma.remarks.update({where: { remarkId }, data: body},)
    }
    getRemarkbyId(remarkId: number ){
        return this.prisma.remarks.findUnique({where: { remarkId }})
    }


    //fetching equipment type info
    
}