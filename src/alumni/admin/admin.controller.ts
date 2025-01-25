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
    @Query('isApproved') isApproved: string,
  ) {
    const experienceId = parseInt(id, 10);
    if (isNaN(experienceId)) {
      throw new BadRequestException('Invalid ID format');
    }
    let temp: boolean = true;
    if (isApproved.toLocaleLowerCase() === 'false') temp = false;
    return await this.adminService.handleInterviewExperienceApproval(
      experienceId,
      temp,
    );
  }

  // Approve Professional Information by ID
  @Patch('professional-information/:id/handleApprove')
  async handleProfessionalInformationApproval(
    @Param('id') id: string,
    @Query('isApproved') isApproved: string,
  ) {
    const infoId = parseInt(id, 10);
    if (isNaN(infoId)) {
      throw new BadRequestException('Invalid ID format');
    }
    let temp: boolean = true;
    if (isApproved.toLocaleLowerCase() === 'false') temp = false;
    return await this.adminService.handleProfessionalInformationApproval(
      infoId,
      temp,
    );
  }

  // Approve User by ID
  @Patch('users/:id/handleApprove')
  async handleUserApproval(
    @Param('id') id: string,
    @Query('isApproved') isApproved: string,
  ) {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new BadRequestException('Invalid ID format');
    }
    let temp: boolean = true;
    if (isApproved.toLocaleLowerCase() === 'false') temp = false;
    return await this.adminService.handleUserApproval(userId, temp);
  }

  // Get Achievements
  @Get('achievements')
  async getAchievements(
    @Query('status') status: string,
    @Query('role') role?: string,
  ) {
    return await this.adminService.getAchievements(status,role)
  }

  @Patch('achievement/:id/handleApprove')
  async handleAchievementApproval(
    @Param('id') id: string,
    @Query('isApproved') isStatus: string,
  ){
    const achievementId = parseInt(id, 10);
    if (isNaN(achievementId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.adminService.handleAchievementApproval(achievementId,isStatus);
  }
}
