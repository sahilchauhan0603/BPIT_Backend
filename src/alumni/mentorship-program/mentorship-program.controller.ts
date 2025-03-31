import { 
    Controller, 
    Post, 
    Put, 
    Body, 
    Param, 
    Query, 
    Get, 
    Delete, 
    BadRequestException 
} from '@nestjs/common';
import { MentorshipProgramService } from './mentorship-program.service';
import { CreateMentorshipProgramDto, UpdateMentorshipProgramDto } from './dto/index.dto'
import { MentorType } from '@prisma/client';

@Controller('mentorship-program')
export class MentorshipProgramController {
    constructor(private readonly mentorshipProgramService: MentorshipProgramService) {}

    // Create a new mentorship program
    @Post()
    async create(@Body() createMentorshipProgramDto: CreateMentorshipProgramDto) {
      return await this.mentorshipProgramService.create(createMentorshipProgramDto);
    }
  
    // Get all mentorship programs with pagination
    @Get()
    async findAll(@Query('page') page: string = '1') {
      const pageNumber = parseInt(page, 10) || 1;
      return await this.mentorshipProgramService.findAll(pageNumber);
    }
  
    // Get a specific mentorship program by ID
    @Get(':id')
    async findOne(@Param('id') id: string) {
      const programId = parseInt(id, 10);
      if (isNaN(programId)) {
        throw new BadRequestException('Invalid ID format');
      }
      return await this.mentorshipProgramService.findOne(programId);
    }

    @Get(':MentorType/:id')
    async findByMentor(
      @Param('id') id: string,
      @Param('MentorType') MentorType: string
  ) {
      const mentorId = parseInt(id, 10);
      if (isNaN(mentorId)) {
        throw new BadRequestException('Invalid ID format');
      }
      return await this.mentorshipProgramService.findByMentor(mentorId,MentorType as MentorType);
    }
  
    // Update a mentorship program
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateMentorshipProgramDto: UpdateMentorshipProgramDto,
    ) {
      const programId = parseInt(id, 10);
      if (isNaN(programId)) {
        throw new BadRequestException('Invalid ID format');
      }
      return await this.mentorshipProgramService.update(programId, updateMentorshipProgramDto);
    }
  
    // Delete a mentorship program
    @Delete(':id')
    async remove(@Param('id') id: string) {
      const programId = parseInt(id, 10);
      if (isNaN(programId)) {
        throw new BadRequestException('Invalid ID format');
      }
      return await this.mentorshipProgramService.remove(programId);
    }
}
