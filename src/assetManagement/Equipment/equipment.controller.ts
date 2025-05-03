import { Controller, Get , Post , Body, Put ,Param, ParseIntPipe} from "@nestjs/common";
import { EquipmentService } from "./equipment.service";
import { Prisma } from "@prisma/client";

@Controller("/assetManagement/equipment")
export class EquipmentController{
    constructor(private readonly equipmentService: EquipmentService){}
    @Get()
    getallEquipment(){
        return this.equipmentService.getAllEquipment()
    }

    @Post()
    createEquipment(@Body() body: Prisma.EquipmentCreateInput){
        return this.equipmentService.createEquipment(body);
    }

    @Put(":id")
    updateEquipment(@Param("id", ParseIntPipe) id: number, @Body() body:Prisma.EquipmentUpdateInput){
        return this.equipmentService.updateEquipment(id , body)
    }

    @Get(":id")
    getEquipmentbyId(@Param("id", ParseIntPipe) id: number){
        return this.equipmentService.getEquipmentbyId(id)
    }
}