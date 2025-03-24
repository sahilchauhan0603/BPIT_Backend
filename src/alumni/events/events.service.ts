import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError, isPrismaError } from '../helper/exception.helper';
import {
  AddEventDto,
  AddEventAttendeDto,
  UpdateEventAttendeDto,
  UpdateEventDto,
} from './dto/index';
import { IsNull } from 'typeorm';
@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  // Create a new interview experience
  async create(dto: AddEventDto) {
    try {
      const event = await this.prisma.event.create({
        data: dto,
      });

      return {
        status: 'success',
        item: event,
        message: 'event created successfully',
      };
    } catch (error) {
      handleError(error);
    }
  }

  // Get all Event Not Associated with any Society
  async findAll(page: number) {
    try {
      const whereClause: any = { societyId: null };

      const events = await this.prisma.event.findMany({
        where: whereClause,
        skip: (page - 1) * 10,
        take: 10,
        include: {
          attendees: {
            select: {
              role: true,
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  branch: true,
                  role: true,
                  passingYear: true,
                  linkedInProfileUrl: true,
                  githubProfileUrl: true,
                  instagramProfileUrl: true,
                },
              },
            },
          },
        },
      });

      const count = await this.prisma.event.count({ where: whereClause });
      return {
        status: 'success',
        items: events,
        meta: {
          totalItems: count,
          currentPage: page,
          totalPages: Math.ceil(count / 10),
          itemsPerPage: 10,
        },
      };
    } catch (error) {
      handleError(error);
    }
  }

  // Get an event by EventID
  async findOne(id: number) {
    try {
      const event = await this.prisma.event.findUnique({
        where: { eventId: id },
        include: {
          attendees: {
            select: {
              role: true,
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  branch: true,
                  role: true,
                  passingYear: true,
                  linkedInProfileUrl: true,
                  githubProfileUrl: true,
                  instagramProfileUrl: true,
                },
              },
            },
          },
        },
      });

      if (!event) {
        throw new HttpException(
          { status: 'error', message: 'event not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      return { status: 'success', item: event };
    } catch (error) {
      handleError(error);
    }
  }

  async AddRole(dto: AddEventAttendeDto) {
    try {
      const role = await this.prisma.eventAttendee.create({
        data: dto,
      });

      return {
        status: 'success',
        item: role,
        message: 'Role added successfully',
      };
    } catch (error) {
      handleError(error);
    }
  }

  async getAllRole(eventId: number) {
    try {
      const roles = await this.prisma.eventAttendee.findMany({
        where: { eventId: eventId },
        include: {
          user: {
            select: {
              role: true,
              firstName: true,
              lastName: true,
              branch: true,
              passingYear: true,
              linkedInProfileUrl: true,
              githubProfileUrl: true,
              instagramProfileUrl: true,
            },
          },
        },
      });

      if (!roles) {
        throw new HttpException(
          { status: 'error', message: 'roles not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      return { status: 'success', item: roles };
    } catch (error) {
      handleError(error);
    }
  }

  // Update an Event by ID
  async update(id: number, dto: UpdateEventDto) {
    try {
      const updatedEvent = await this.prisma.event.update({
        where: { eventId: id },
        data: dto,
      });

      return {
        status: 'success',
        item: updatedEvent,
        message: 'Event updated successfully',
      };
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'Event not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }

  // Update an EventRole by ID
  async updateRole(id: number, dto: UpdateEventAttendeDto) {
    try {
      const updatedEventAttende = await this.prisma.eventAttendee.update({
        where: { eventAttendeeId: id },
        data: dto,
      });

      return {
        status: 'success',
        item: updatedEventAttende,
        message: 'Role updated successfully',
      };
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'Role not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }

  // Delete an Event by ID
  async removeEvent(id: number) {
    try {
      const deletedEvent = await this.prisma.event.delete({
        where: { eventId: id },
      });

      return {
        status: 'success',
        item: deletedEvent,
        message: 'event deleted successfully',
      };
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'Interview experience not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }

  async removeRole(id: number) {
    try {
      const deletedAttende = await this.prisma.eventAttendee.delete({
        where: { eventAttendeeId: id },
      });

      return {
        status: 'success',
        item: deletedAttende,
        message: 'event deleted successfully',
      };
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2025') {
        throw new HttpException(
          { status: 'error', message: 'Interview experience not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      handleError(error);
    }
  }

  async getAllEventByUserId(userId: number) {
    try {
      const events = await this.prisma.eventAttendee.findMany({
        where: { userId: userId },
        include: {
          event: {
            select : {
              eventId: true,
              eventName: true,
              eventDate: true,
              eventDescription: true,
              eventLocation: true,
              eventMode: true,
              eventType: true,
              eventImage: true,
              category: true,
              subcategory: true
            }
          },
        },
      });

      if (!events) {
        throw new HttpException(
          { status: 'error', message: 'roles not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      return { status: 'success', item: events };
    } catch (error) {
      handleError(error);
    }
  }
}
