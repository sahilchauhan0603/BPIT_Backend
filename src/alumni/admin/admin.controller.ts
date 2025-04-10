import {
  Controller,
  Patch,
  Param,
  Get,
  Query,
  BadRequestException,
  ParseBoolPipe,
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
    @Query('isApproved', new ParseBoolPipe()) isApproved: boolean,
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
    let experienceId : bigint
    try {
      experienceId = BigInt(id)
    } catch (error) {
      throw new BadRequestException('Invalid experience ID');
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
    let infoId : bigint
    try {
      infoId = BigInt(id)
    } catch (error) {
      throw new BadRequestException('Invalid Professional information ID');
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
    let userId : bigint
    try {
      userId = BigInt(id)
    } catch (error) {
      throw new BadRequestException('Invalid user ID');
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
    return await this.adminService.getAchievements(status, role);
  }

  @Patch('achievement/:id/handleApprove')
  async handleAchievementApproval(
    @Param('id') id: string,
    @Query('isApproved') isStatus: string,
  ) {
    let achievementId : bigint
    try {
      achievementId = BigInt(id)
    } catch (error) {
      throw new BadRequestException('Invalid achievement ID');
    }
    return await this.adminService.handleAchievementApproval(
      achievementId,
      isStatus,
    );
  }
}
