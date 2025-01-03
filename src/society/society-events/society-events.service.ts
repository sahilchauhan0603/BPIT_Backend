import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
@Injectable()
export class SocietyEventsService {
  constructor(private readonly prisma: PrismaService) {}

  async addEvent(createEventDto: CreateEventDto) {
    // Directly create a new event using the DTO data
    const newEvent = await this.prisma.event.create({
      data: {
        societyId: createEventDto.societyId, // Assuming `societyId` exists in the DTO
        eventName: createEventDto.eventName, // Assuming `eventName` exists in the DTO
        eventDescription: createEventDto.eventDescription,
        eventDate: createEventDto.eventDate,
        eventType: createEventDto.eventType,
        eventLocation: createEventDto.eventLocation,
        eventImage: createEventDto.eventImage,
        eventMode: createEventDto.eventMode,
        category: createEventDto.category,
        subcategory: createEventDto.subcategory,
        linkToRegister: createEventDto.linkToRegister,
      },
    });

    // Return a success response with the newly created event
    return {
      status: 'success',
      item: newEvent,
      message: 'Event added successfully',
    };
  }

  async updateEvent(eventID: number, updateEventDto: UpdateEventDto) {
    // Find the existing event
    const existingEvent = await this.prisma.event.findUnique({
      where: { eventId: eventID },
    });

    // If the event doesn't exist, throw an error
    if (!existingEvent) {
      throw new Error('Event not found');
    }

    // Update the event with the provided data
    const updatedEvent = await this.prisma.event.update({
      where: { eventId: eventID },
      data: {
        eventName: updateEventDto.eventName,
        eventDescription: updateEventDto.eventDescription,
        eventDate: updateEventDto.eventDate,
        eventType: updateEventDto.eventType,
        eventLocation: updateEventDto.eventLocation,
        eventImage: updateEventDto.eventImage,
        eventMode: updateEventDto.eventMode,
        category: updateEventDto.category,
        subcategory: updateEventDto.subcategory,
        linkToRegister: updateEventDto.linkToRegister,
      },
    });

    // Return a success response with the updated event
    return {
      status: 'success',
      item: updatedEvent,
      message: 'Event updated successfully',
    };
  }

  async fetchAllEvents() {
    return this.prisma.event.findMany({
      orderBy: { eventId: 'asc' },
    });
  }

  async fetchEventById(eventID: number) {
    return this.prisma.event.findMany({
      where: { societyId: eventID },
    });
  }

  async fetchEventsBySocietyId(societyID: number) {
    return this.prisma.event.findMany({ where: { societyId: societyID } });
  }

  async removeEvent(eventID: number): Promise<{ message: string }> {
    const event = await this.prisma.event.findUnique({
      where: { eventId: eventID },
    });
    if (!event) {
      throw new Error('Event not found');
    }
    await this.prisma.event.delete({
      where: { eventId: eventID },
    });

    // Return success message
    return { message: 'Achievement successfully deleted' };
  }

  async removeEventsBySocietyId(
    societyID: number,
  ): Promise<{ status: string; message: string }> {
    // Find all events for the given society ID
    const events = await this.prisma.event.findMany({
      where: { societyId: societyID },
    });

    // If no events are found, throw an error
    if (events.length === 0) {
      throw new Error('No events found for the given society');
    }

    // Delete all events for the given society ID
    await this.prisma.event.deleteMany({
      where: { societyId: societyID },
    });

    // Return a success response
    return {
      status: 'success',
      message:
        'All events for the specified society have been successfully deleted',
    };
  }
}
