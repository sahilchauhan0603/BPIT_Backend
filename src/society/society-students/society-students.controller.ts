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
      enrollmentNo,
      updateStudentDto,
    );
  }

  @Get('/societyStudents')
  async fetchAllStudents(): Promise<SocietyMember[]> {
    return this.societyStudentsService.fetchAllStudents();
  }

  @Get('/societyStudents/:enrollmentNo')
  async fetchStudent(
    @Param('enrollmentNo') enrollmentNo: number,
  ): Promise<SocietyMember> {
    return this.societyStudentsService.fetchStudent(enrollmentNo);
  }

  // @Get('contributions/:enrollmentNo')
  // async fetchContributions(
  //   @Param('enrollmentNo') enrollmentNo: number,
  // ): Promise<SocietyMember> {
  //   return this.societyStudentsService.fetchContributions(enrollmentNo);
  // }

  @Delete('/societyStudents/:enrollmentNo')
  async removeStudent(
    @Param('enrollmentNo') enrollmentNo: number,
  ): Promise<{ message: string }> {
    return this.societyStudentsService.removeStudent(enrollmentNo);
  }

  @Get('/admin/societyStudents/:societyID')
  async fetchStudentsBySocietyID(
    @Param('societyID') societyID: string,
  ): Promise<SocietyMember[]> {
    return this.societyStudentsService.fetchStudentsBySocietyID(societyID);
  }

  // ADMIN PANEL
  @Get('admin/societyStudents/all')
  async fetchAllStudentsAdmin(): Promise<any[]> {
    return this.societyStudentsService.fetchAllStudentsAdmin();
  }

  @Get('admin/societyStudents/:societyID')
  async fetchStudentsSocietyAdmin(
    @Param('societyID') societyID: string,
  ): Promise<any[]> {
    return this.societyStudentsService.fetchStudentsSocietyAdmin(societyID);
  }
}
