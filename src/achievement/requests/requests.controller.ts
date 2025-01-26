/* eslint-disable prettier/prettier */
import {RequestsService } from './requests.service'
import { Body, Controller, Get } from '@nestjs/common';
@Controller('requests')
export class RequestsController {
    constructor(private readonly requestService: RequestsService) {}
    @Get()
    async getUnverifiedRequests(@Body() mentorId: number) {
        return this.requestService.getUnverifiedRequests(mentorId);
    }
}
