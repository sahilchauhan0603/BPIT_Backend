import { Controller, Get , Post , Body, Put ,Param, ParseIntPipe} from "@nestjs/common";
import { EquipmentTypeService } from "./equipmentType.service";
import { Prisma } from "@prisma/client";

@Controller("/assetManagement/equipmentType")
export class EquipmentTypeController{
    constructor(private readonly equipmentTypeService: EquipmentTypeService){}
    @Get()
    getallEquipmentType(){
        return this.equipmentTypeService.getAllEquipmentType()
    }

    @Post()
    createEquipmentType(@Body() body: Prisma.EquipmentTypeCreateInput){
        return this.equipmentTypeService.createEquipmentType(body);
    }

    @Put(":id")
    updateEquipmentType(@Param("id", ParseIntPipe) id: number, @Body() body:Prisma.EquipmentTypeUpdateInput){
        return this.equipmentTypeService.updateEquipmentType(id , body)
    }

    @Get(":id")
    getEquipmentTypebyId(@Param("id", ParseIntPipe) id: number){
        return this.equipmentTypeService.getEquipmentTypebyId(id)
    }
}