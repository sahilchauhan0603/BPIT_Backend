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
    let eventId : bigint
    try {
      eventId = BigInt(id)
    } catch {
      throw new BadRequestException('Invalid Event Id')
    }
    return await this.eventsService.findOne(eventId);
  }
  @Get('/applied/:id')
  async findAllRoles(@Param('id') id: string) {
    let eventId : bigint
    try {
      eventId = BigInt(id)
    } catch {
      throw new BadRequestException('Invalid Event Id')
    }
    return await this.eventsService.getAllRole(eventId);
  }

  @Get('/user/:id')
  async findAllEvents(@Param('id') id: string) {
    let userId : bigint
    try {
      userId = BigInt(id)
    } catch {
      throw new BadRequestException('Invalid Event Id')
    }
    return await this.eventsService.getAllEventByUserId(userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    let eventId : bigint
    try {
      eventId = BigInt(id)
    } catch {
      throw new BadRequestException('Invalid Event Id')
    }
    return await this.eventsService.update(eventId, updateEventDto);
  }

  @Put('/apply/:id')
  async updateRole(
    @Param('id') id: string,
    @Body() updateEventAttendeDto: UpdateEventAttendeDto,
  ) {
    let eventAttendeId : bigint
    try {
      eventAttendeId = BigInt(id)
    } catch {
      throw new BadRequestException('Invalid Event Attende Id')
    }
    return await this.eventsService.updateRole(
      eventAttendeId,
      updateEventAttendeDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let eventId : bigint
    try {
      eventId = BigInt(id)
    } catch {
      throw new BadRequestException('Invalid Event Id')
    }
    return await this.eventsService.removeEvent(eventId);
  }

  @Delete('/apply/:id')
  async removeRole(@Param('id') id: string) {
    let eventAttendeId : bigint
    try {
      eventAttendeId = BigInt(id)
    } catch {
      throw new BadRequestException('Invalid Event Attende Id')
    }
    return await this.eventsService.removeRole(eventAttendeId);
  }
}
