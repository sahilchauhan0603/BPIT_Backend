import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class EquipmentService{
    constructor(private readonly prisma: PrismaService){}
    //fetching equipment info
    getAllEquipment(){
        return this.prisma.equipment.findMany();
    }

    createEquipment(body: Prisma.EquipmentCreateInput){
        return this.prisma.equipment.create({
            data:body
        });
    }

    updateEquipment(equipmentId: number , body: Prisma.EquipmentUpdateInput){
        return this.prisma.equipment.update({where: { equipmentId }, data: body},)
    }
    getEquipmentbyId(equipmentId: number ){
        return this.prisma.equipment.findUnique({where: { equipmentId }})
    }


    //fetching equipment type info
    
}