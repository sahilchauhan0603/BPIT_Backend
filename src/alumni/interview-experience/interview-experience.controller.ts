// interview-experience.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, BadRequestException } from '@nestjs/common';
import { InterviewExperienceService } from './interview-experience.service';
import { CreateInterviewExperienceDto, UpdateInterviewExperienceDto } from './dto/index';

@Controller('interview-experience')
export class InterviewExperienceController {
  constructor(private readonly interviewExperienceService: InterviewExperienceService) {}

  // Create a new interview experience
  @Post()
  async create(@Body() createInterviewExperienceDto: CreateInterviewExperienceDto) {
    return await this.interviewExperienceService.create(createInterviewExperienceDto);
  }

  // Get all interview experiences (only approved ones)
  @Get()
  async findAll() {
    return await this.interviewExperienceService.findAll();
  }

  // Get a specific interview experience by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const experienceId = parseInt(id, 10);
    if (isNaN(experienceId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.interviewExperienceService.findOne(experienceId);
  }

  // Get all interview experiences for a user (approved and non-approved)
  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    const userIdInt = parseInt(userId, 10);
    if (isNaN(userIdInt)) {
      throw new BadRequestException('Invalid User ID format');
    }
    return await this.interviewExperienceService.findByUserId(userIdInt);
  }

  // Update an interview experience by ID
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInterviewExperienceDto: UpdateInterviewExperienceDto,
  ) {
    const experienceId = parseInt(id, 10);
    if (isNaN(experienceId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.interviewExperienceService.update(experienceId, updateInterviewExperienceDto);
  }

  // Delete an interview experience by ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const experienceId = parseInt(id, 10);
    if (isNaN(experienceId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.interviewExperienceService.remove(experienceId);
  }
}
