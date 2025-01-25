import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EventsService } from './events.service';
import { AddEventDto, AddEventAttendeDto, UpdateEventDto, UpdateEventAttendeDto } from './dto/index';

@Controller('alumni/events')
export class EventsController {
    constructor(
        private readonly eventsService: EventsService,
    ) {}

    @Post()
    async create(
        @Body() AddEventDto: AddEventDto,
      ) {
        return await this.eventsService.create(
          AddEventDto,
        );
    }
    @Post('/role')
    async createRole(
        @Body() AddEventAttendeDto: AddEventAttendeDto
    ){
        return await this.eventsService.AddRole(AddEventAttendeDto);
    }
    @Get()
    async findAll(){
        return await this.eventsService.findAll();
    }
    @Get(':id')
    async find(
        @Param('id') id: string
    ){
        const eventId = parseInt(id, 10);
            if (isNaN(eventId)) {
              throw new BadRequestException('Invalid User ID format');
            }
        return await this.eventsService.findOne(eventId);
    }
    @Get('/roles/:id')
    async findAllRoles(
        @Param('id') id: string
    ){
        const eventId = parseInt(id, 10);
        if (isNaN(eventId)) {
          throw new BadRequestException('Invalid User ID format');
        }
        return await this.eventsService.findOne(eventId);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateEventDto: UpdateEventDto
    ){
        const eventId = parseInt(id, 10);
        if (isNaN(eventId)) {
          throw new BadRequestException('Invalid User ID format');
        }
        return await this.eventsService.update(eventId, updateEventDto);
    }

    @Put('/role/:id')
    async updateRole(
        @Param('id') id: string,
        @Body() updateEventAttendeDto: UpdateEventAttendeDto
    ){
        const eventAttendeId = parseInt(id, 10);
            if (isNaN(eventAttendeId)) {
              throw new BadRequestException('Invalid User ID format');
            }
        return await this.eventsService.updateRole(eventAttendeId, updateEventAttendeDto);
    }

    @Delete(':id')
    async remove(
        @Param('id') id: string,
    ){
        const eventId = parseInt(id, 10);
        if (isNaN(eventId)) {
          throw new BadRequestException('Invalid User ID format');
        }
        return await this.eventsService.removeEvent(eventId);
    }

    @Delete('/role/:id')
    async removeRole(
        @Param('id') id: string,
    ){
        const eventAttendeId = parseInt(id, 10);
        if (isNaN(eventAttendeId)) {
          throw new BadRequestException('Invalid User ID format');
        }
        return await this.eventsService.removeRole(eventAttendeId);
    }
}
