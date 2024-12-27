import { Controller, Post } from '@nestjs/common';
import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {
    constructor(private readonly requestService: RequestsService) {}

}
