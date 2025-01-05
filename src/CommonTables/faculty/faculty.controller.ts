import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';

@Controller('api/v1/faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @Post()
  async createFaculty(@Body() createFacultyDto: CreateFacultyDto) {
    return this.facultyService.createFaculty(createFacultyDto);
  }

  @Get()
  async getAllFaculties() {
    return this.facultyService.getAllFaculties();
  }

  @Get(':id')
  async getFacultyById(@Param('id', ParseIntPipe) id: number) {
    return this.facultyService.getFacultyById(Number(id));
  }

  @Put(':id')
  async updateFaculty(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFacultyDto: UpdateFacultyDto,
  ) {
    return this.facultyService.updateFaculty(Number(id), updateFacultyDto);
  }

  @Delete(':id')
  async deleteFaculty(@Param('id', ParseIntPipe) id: number) {
    return this.facultyService.deleteFaculty(Number(id));
  }
}
