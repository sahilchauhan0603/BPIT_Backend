import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RoomService{
    constructor(private readonly prisma: PrismaService){}
    
    getAllRooms(){
        return this.prisma.room.findMany();
    }

    createRooms(body: Prisma.RoomCreateInput){
        return this.prisma.room.create({
            data:body
        });
    }

    updateRooms(roomId: number , body: Prisma.RoomUpdateInput){
        return this.prisma.room.update({where: { roomId }, data: body},)
    }
    getRoombyId(roomId: number ){
        return this.prisma.room.findUnique({where: { roomId }})
    }
}