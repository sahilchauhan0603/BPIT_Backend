import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import {
  AddEventDto,
  AddEventAttendeDto,
  UpdateEventDto,
  UpdateEventAttendeDto,
} from './dto/index';

@Controller('alumni/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(@Body() AddEventDto: AddEventDto) {
    return await this.eventsService.create(AddEventDto);
  }
  @Post('/apply')
  async createRole(@Body() AddEventAttendeDto: AddEventAttendeDto) {
    return await this.eventsService.AddRole(AddEventAttendeDto);
  }
  @Get()
  async findAll(@Query('page') page: string = '1') {
    const pageNumber = parseInt(page, 10) || 1;
    return await this.eventsService.findAll(pageNumber);
  }
  @Get(':id')
  async find(@Param('id') id: string) {
    const eventId = parseInt(id, 10);
    if (isNaN(eventId)) {
      throw new BadRequestException('Invalid event ID format');
    }
    return await this.eventsService.findOne(eventId);
  }
  @Get('/applied/:id')
  async findAllRoles(@Param('id') id: string) {
    const eventId = parseInt(id, 10);
    if (isNaN(eventId)) {
      throw new BadRequestException('Invalid event ID format');
    }
    return await this.eventsService.getAllRole(eventId);
  }

  @Get('/user/:id')
  async findAllEvents(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new BadRequestException('Invalid event ID format');
    }
    return await this.eventsService.getAllEventByUserId(userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    const eventId = parseInt(id, 10);
    if (isNaN(eventId)) {
      throw new BadRequestException('Invalid event ID format');
    }
    return await this.eventsService.update(eventId, updateEventDto);
  }

  @Put('/apply/:id')
  async updateRole(
    @Param('id') id: string,
    @Body() updateEventAttendeDto: UpdateEventAttendeDto,
  ) {
    const eventAttendeId = parseInt(id, 10);
    if (isNaN(eventAttendeId)) {
      throw new BadRequestException('Invalid User ID format');
    }
    return await this.eventsService.updateRole(
      eventAttendeId,
      updateEventAttendeDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const eventId = parseInt(id, 10);
    if (isNaN(eventId)) {
      throw new BadRequestException('Invalid User ID format');
    }
    return await this.eventsService.removeEvent(eventId);
  }

  @Delete('/apply/:id')
  async removeRole(@Param('id') id: string) {
    const eventAttendeId = parseInt(id, 10);
    if (isNaN(eventAttendeId)) {
      throw new BadRequestException('Invalid User ID format');
    }
    return await this.eventsService.removeRole(eventAttendeId);
  }
}
