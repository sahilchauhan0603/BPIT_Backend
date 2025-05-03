import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class EquipmentTypeService{
    constructor(private readonly prisma: PrismaService){}
    //fetching equipment info
    getAllEquipmentType(){
        return this.prisma.equipmentType.findMany();
    }

    createEquipmentType(body: Prisma.EquipmentTypeCreateInput){
        return this.prisma.equipmentType.create({
            data:body
        });
    }

    updateEquipmentType(equipmentTypeId: number , body: Prisma.EquipmentTypeUpdateInput){
        return this.prisma.equipmentType.update({where: { equipmentTypeId }, data: body},)
    }
    getEquipmentTypebyId(equipmentTypeId: number ){
        return this.prisma.equipmentType.findUnique({where: { equipmentTypeId }})
    } 
}