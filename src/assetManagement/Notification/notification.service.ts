import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class NotificationService{
    constructor(private readonly prisma: PrismaService){}
    //fetching equipment info
    getAllNotification(){
        return this.prisma.notificationAsset.findMany();
    }

    createNotification(body: Prisma.NotificationAssetCreateInput){
        return this.prisma.notificationAsset.create({
            data:body
        });
    }

    updateNotification(notificationId: number , body: Prisma.NotificationAssetUpdateInput){
        return this.prisma.notificationAsset.update({where: { notificationId }, data: body},)
    }
    getNotificationbyId(notificationId: number ){
        return this.prisma.notificationAsset.findUnique({where: { notificationId }})
    }


    //fetching equipment type info
    
}