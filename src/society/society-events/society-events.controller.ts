import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { SocietyEventsService } from './society-events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('api/v1')
export class SocietyEventsController {
  constructor(private readonly societyEventsService: SocietyEventsService) {}

  @Post('/societyEvents')
  async addNewEvent(@Body() createEventDto: CreateEventDto) {
    return await this.societyEventsService.addEvent(createEventDto);
  }

  @Put('/societyEvents/:eventID')
  async updateEvent(
    @Param('eventID') eventID: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return await this.societyEventsService.updateEvent(
      Number(eventID),
      updateEventDto,
    );
  }

  @Get('/societyEvents')
  async getAllEvents() {
    return await this.societyEventsService.fetchAllEvents();
  }

  @Get('/societyEvents/:eventID')
  async getEventById(@Param('eventID') eventID: number) {
    return await this.societyEventsService.fetchEventById(Number(eventID));
  }

  @Get('/societyEvents/society/:societyID')
  async getEventsBySocietyId(@Param('societyID') societyID: number) {
    return await this.societyEventsService.fetchEventsBySocietyId(
      Number(societyID),
    );
  }

  @Delete('/societyEvents/delete/:eventID')
  async removeEvent(@Param('eventID') eventID: number) {
    return await this.societyEventsService.removeEvent(Number(eventID));
  }

  @Delete('/societyEvents/deleteBySociety/:societyID')
  async removeEventsBySocietyId(@Param('societyID') societyID: number) {
    return await this.societyEventsService.removeEventsBySocietyId(
      Number(societyID),
    );
  }
}
