import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { SocietyStudentsService } from './society-students.service';
import { CreateStudentDto } from './societyStudentsDTO/create-student.dto';
import { UpdateStudentDto } from './societyStudentsDTO/update-student.dto';
import { SocietyMember } from '@prisma/client';

@Controller('api/v1')
export class SocietyStudentsController {
  constructor(
    private readonly societyStudentsService: SocietyStudentsService,
  ) {}

  @Post('/societyStudents')
  async addNewSociety(@Body() createSocietyDto: CreateStudentDto) {
    return await this.societyStudentsService.addNewStudent(createSocietyDto);
  }

  @Put('/societyStudents/:enrollmentNo')
  async updateStudent(
    @Param('enrollmentNo') enrollmentNo: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<SocietyMember> {
    return this.societyStudentsService.updateStudent(
      Number(enrollmentNo),
      updateStudentDto,
    );
  }

  @Get('/societyStudents')
  async fetchAllStudents(): Promise<SocietyMember[]> {
    return this.societyStudentsService.fetchAllStudents();
  }

  @Get('/societyStudents/user/:userId')
  async fetchStudent(@Param('userId') userId: number) {
    return this.societyStudentsService.fetchStudent(Number(userId));
  }

  // @Get('contributions/:enrollmentNo')
  // async fetchContributions(
  //   @Param('enrollmentNo') enrollmentNo: number,
  // ): Promise<SocietyMember> {
  //   return this.societyStudentsService.fetchContributions(enrollmentNo);
  // }

  @Delete('/societyStudents/:memberId')
  async removeStudent(
    @Param('memberId') memberId: number,
  ): Promise<{ message: string }> {
    return this.societyStudentsService.removeStudent(Number(memberId));
  }

  @Get('/societyStudents/society/:societyID')
  async fetchStudentsBySocietyID(
    @Param('societyID') societyID: number,
  ): Promise<any[]> {
    return this.societyStudentsService.fetchStudentsBySocietyID(
      Number(societyID),
    );
  }

  // ADMIN PANEL
  @Get('admin/societyStudents/all')
  async fetchAllStudentsAdmin(): Promise<any[]> {
    return this.societyStudentsService.fetchAllStudentsAdmin();
  }

  @Get('admin/societyStudents/:societyID')
  async fetchStudentsSocietyAdmin(
    @Param('societyID') societyID: number,
  ): Promise<any[]> {
    return this.societyStudentsService.fetchStudentsSocietyAdmin(
      Number(societyID),
    );
  }
}
