import { 
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    BadRequestException
} from '@nestjs/common';
import { MentorshipApplicationsService } from './mentorship-applications.service';
import { CreateMentorshipAppicationDto, UpdateMentorshipAppicationStatusDto } from './dto/index.dto';

@Controller('mentorship-applications')
export class MentorshipApplicationsController {
    constructor(private readonly mentorshipApplicationService: MentorshipApplicationsService) {}
      
    // Create a new job application (Ensure job posting is active)
    @Post()
    async create(@Body() createMentorshipApplicationDto: CreateMentorshipAppicationDto) {
      return await this.mentorshipApplicationService.create(createMentorshipApplicationDto);
    }
      
    // Get all job applications for a given job posting ID
    @Get('program/:programId')
    async findByProgramId(@Param('programId') Id: string) {
        let programId : bigint
        try{
            programId = BigInt(Id)
        } catch{
            throw new BadRequestException('Invalid program ID')
        }
        return await this.mentorshipApplicationService.findByProgramId(programId);
    }
      
    // Get all applications submitted by a specific user
    @Get('user/:userId')
    async findByUserId(@Param('userId') userId: string) {
        let userIdInt : bigint
        try{
            userIdInt = BigInt(userId)
        } catch{
           throw new BadRequestException('Invalid user ID')
        }
        return await this.mentorshipApplicationService.findByUserId(userIdInt);
    }
      
    // Get a specific application by ID
    @Get(':id')
    async findOne(@Param('id') id: string) {
        let appId : bigint
        try{
            appId = BigInt(id)
        } catch{
            throw new BadRequestException('Invalid application ID')
        }
        return await this.mentorshipApplicationService.findOne(appId);
    }
      
      
    // Update the status of a job application
    @Put(':id/status')
    async updateStatus(@Param('id') id: string, @Body() updateApplicationStatusDto: UpdateMentorshipAppicationStatusDto) {
        let appId : bigint
        try{
            appId = BigInt(id)
        } catch{
            throw new BadRequestException('Invalid application ID')
        }
        return await this.mentorshipApplicationService.updateStatus(appId, updateApplicationStatusDto.status);
    }
      
    // Delete a job application
    @Delete(':id')
    async remove(@Param('id') id: string) {
        let appId : bigint
        try{
            appId = BigInt(id)
        } catch{
            throw new BadRequestException('Invalid application ID')
        }
        return await this.mentorshipApplicationService.remove(appId);
    }
}
