import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Param,
  Body,
} from '@nestjs/common';
import { StudentMarkingService } from './society-students-marking.service';
import { CreateStudentMarkingDto } from './dto/create-student-marking.dto';
import { UpdateStudentMarkingDto } from './dto/update-student-marking.dto';

@Controller('api/v1')
export class StudentMarkingController {
  constructor(private readonly studentMarkingService: StudentMarkingService) {}

  @Post('/studentMarking')
  async addNewMarking(
    @Body() createStudentMarkingDto: CreateStudentMarkingDto,
  ) {
    return this.studentMarkingService.create(createStudentMarkingDto);
  }

  @Put('/studentMarking/:enrollmentNo')
  async updateMarking(
    @Param('enrollmentNo') enrollmentNo: number,
    @Body() updateStudentMarkingDto: UpdateStudentMarkingDto,
  ) {
    return this.studentMarkingService.update(
      Number(enrollmentNo),
      updateStudentMarkingDto,
    );
  }

  @Get('/studentMarking')
  async fetchAllMarkings() {
    return this.studentMarkingService.findAll(); //
  }

  @Get('/studentMarking/society/:societyID')
  async fetchMarkingBySocietyID(@Param('societyID') societyID: number) {
    return this.studentMarkingService.findBySocietyID(Number(societyID));
  }

  @Delete('remove/:enrollmentNo')
  async removeMarking(@Param('enrollmentNo') enrollmentNo: number) {
    return this.studentMarkingService.remove(Number(enrollmentNo));
  }
}
