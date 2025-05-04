import { Controller, Get , Post , Body, Put ,Param, ParseIntPipe} from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { Prisma } from "@prisma/client";

@Controller("/assetManagement/notification")
export class NotificationController{
    constructor(private readonly notificationService: NotificationService){}
    @Get()
    getallNotification(){
        return this.notificationService.getAllNotification()
    }

    @Post()
    createNotification(@Body() body: Prisma.NotificationAssetCreateInput){
        return this.notificationService.createNotification(body);
    }

    @Put(":id")
    updateNotification(@Param("id", ParseIntPipe) id: number, @Body() body:Prisma.NotificationAssetUpdateInput){
        return this.notificationService.updateNotification(id , body)
    }

    @Get(":id")
    getNotificationbyId(@Param("id", ParseIntPipe) id: number){
        return this.notificationService.getNotificationbyId(id)
    }
}