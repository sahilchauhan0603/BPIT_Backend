
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
@Controller('requests')
export class RequestsController {
    constructor(private readonly requestService: RequestsService) {}
    @Get()
    async getUnverifiedRequests(@Body() mentorId: number) {
        return this.requestService.getUnverifiedRequests(mentorId);
    }
}
