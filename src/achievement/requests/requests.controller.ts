import { Body, Controller, Get, Post } from '@nestjs/common';
import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestService: RequestsService) {}
  @Get()
  async getUnverifiedRequests(@Body() mentorId: number) {
    return this.requestService.getUnverifiedRequests(mentorId);
  }
}
