import {
  Controller,
  Patch,
  Param,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Get approved or unapproved Interview Experiences
  @Get('interview-experiences')
  async getInterviewExperiences(
    @Query('isApproved') isApproved: boolean,
    @Query('role') role?: string,
  ) {
    return await this.adminService.getInterviewExperiences(isApproved, role);
  }

  // Get approved or unapproved Professional Information
  @Get('professional-information')
  async getProfessionalInformation(
    @Query('isApproved') isApproved: boolean,
    @Query('role') role?: string,
  ) {
    return await this.adminService.getProfessionalInformation(isApproved, role);
  }

  // Get all users (Alumni or Students) by approval status and role
  @Get('users')
  async getUsers(
    @Query('isApproved') isApproved: boolean,
    @Query('role') role?: string,
  ) {
    return await this.adminService.getUsers(isApproved, role);
  }

  // Approve Interview Experience by ID
  @Patch('interview-experiences/:id/handleApprove')
  async handleInterviewExperienceApproval(
    @Param('id') id: string,
    @Query('isApproved') isApproved: boolean,
  ) {
    const experienceId = parseInt(id, 10);
    if (isNaN(experienceId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.adminService.handleInterviewExperienceApproval(
      experienceId,
      isApproved,
    );
  }

  // Approve Professional Information by ID
  @Patch('professional-information/:id/handleApprove')
  async handleProfessionalInformationApproval(
    @Param('id') id: string,
    @Query('isApproved') isApproved: boolean,
  ) {
    const infoId = parseInt(id, 10);
    if (isNaN(infoId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.adminService.handleProfessionalInformationApproval(
      infoId,
      isApproved,
    );
  }

  // Approve User by ID
  @Patch('users/:id/handleApprove')
  async handleUserApproval(
    @Param('id') id: string,
    @Query('isApproved') isApproved: boolean,
  ) {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.adminService.handleUserApproval(userId, isApproved);
  }
}
