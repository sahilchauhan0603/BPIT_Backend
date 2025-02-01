import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobPostingDto, UpdateJobPostingDto } from './dto/index';

@Controller('job-postings')
export class JobsController {
  constructor(private readonly JobsService: JobsService) {}

  // Create a new job posting
  @Post()
  async create(@Body() createJobPostingDto: CreateJobPostingDto) {
    return await this.JobsService.create(createJobPostingDto);
  }

  // Get all job postings
  @Get()
  async findAll(@Query('page') page: string = '1') {
    const pageNumber = parseInt(page, 10) || 1;
    return await this.JobsService.findAll(pageNumber);
  }
  // Get a job posting by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const jobId = parseInt(id, 10);
    if (isNaN(jobId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.JobsService.findOne(jobId);
  }

  // Update a job posting by ID
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateJobPostingDto: UpdateJobPostingDto,
  ) {
    const jobId = parseInt(id, 10);
    if (isNaN(jobId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.JobsService.update(jobId, updateJobPostingDto);
  }

  // Get all job postings by user ID
  @Get('user/:userId')
  async findByUserId(
    @Param('userId') userId: string,
    @Query('page') page: string = '1',
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const userIdInt = parseInt(userId, 10);
    if (isNaN(userIdInt)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.JobsService.findByUserId(userIdInt, pageNumber);
  }
  // Delete a job posting by ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const jobId = parseInt(id, 10);
    if (isNaN(jobId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.JobsService.remove(jobId);
  }
}
