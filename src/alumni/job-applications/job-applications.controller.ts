import { 
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    BadRequestException
  } from '@nestjs/common';
  import { JobApplicationsService } from './job-applications.service';
  import { CreateJobApplicationDto, UpdateJobApplicationDto, UpdateApplicationStatusDto } from './dto/index';
  
  @Controller('job-applications')
  export class JobApplicationsController {
    constructor(private readonly jobApplicationService: JobApplicationsService) {}
  
    // Create a new job application (Ensure job posting is active)
    @Post()
    async create(@Body() createJobApplicationDto: CreateJobApplicationDto) {
      return await this.jobApplicationService.create(createJobApplicationDto);
    }
  
    // Get all job applications for a given job posting ID
    @Get('job/:jobPostingId')
    async findByJobPostingId(@Param('jobPostingId') jobPostingId: string) {
      const jobId = parseInt(jobPostingId, 10);
      if (isNaN(jobId)) {
        throw new BadRequestException('Invalid Job Posting ID format');
      }
      return await this.jobApplicationService.findByJobPostingId(jobId);
    }
  
    // Get all job applications submitted by a specific user
    @Get('user/:userId')
    async findByUserId(@Param('userId') userId: string) {
      const userIdInt = parseInt(userId, 10);
      if (isNaN(userIdInt)) {
        throw new BadRequestException('Invalid User ID format');
      }
      return await this.jobApplicationService.findByUserId(userIdInt);
    }
  
    // Get a specific job application by ID
    @Get(':id')
    async findOne(@Param('id') id: string) {
      const appId = parseInt(id, 10);
      if (isNaN(appId)) {
        throw new BadRequestException('Invalid Application ID format');
      }
      return await this.jobApplicationService.findOne(appId);
    }
  
    // Update a job application (if the job posting is still active)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateJobApplicationDto: UpdateJobApplicationDto) {
      const appId = parseInt(id, 10);
      if (isNaN(appId)) {
        throw new BadRequestException('Invalid Application ID format');
      }
      delete updateJobApplicationDto['status'];
      return await this.jobApplicationService.update(appId, updateJobApplicationDto);
    }
  
    // Update the status of a job application
    @Put(':id/status')
    async updateStatus(@Param('id') id: string, @Body() updateApplicationStatusDto: UpdateApplicationStatusDto) {
      const appId = parseInt(id, 10);
      if (isNaN(appId)) {
        throw new BadRequestException('Invalid Application ID format');
      }
      return await this.jobApplicationService.updateStatus(appId, updateApplicationStatusDto.status);
    }
  
    // Delete a job application
    @Delete(':id')
    async remove(@Param('id') id: string) {
      const appId = parseInt(id, 10);
      if (isNaN(appId)) {
        throw new BadRequestException('Invalid Application ID format');
      }
      return await this.jobApplicationService.remove(appId);
    }
  }
  