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

@Controller('api/v1')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @Post('/faculty')
  async createFaculty(@Body() createFacultyDto: CreateFacultyDto) {
    return this.facultyService.createFaculty(createFacultyDto);
  }

  @Get('/faculty')
  async getAllFaculties() {
    return this.facultyService.getAllFaculties();
  }

  @Get('/faculty/:id')
  async getFacultyById(@Param('id', ParseIntPipe) id: number) {
    return this.facultyService.getFacultyById(Number(id));
  }

  @Put('/faculty/:id')
  async updateFaculty(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFacultyDto: UpdateFacultyDto,
  ) {
    return this.facultyService.updateFaculty(Number(id), updateFacultyDto);
  }

  @Delete('/faculty/:id')
  async deleteFaculty(@Param('id', ParseIntPipe) id: number) {
    return this.facultyService.deleteFaculty(Number(id));
  }

  @Get('/societyCoordinator')
  async getAllCoordinators() {
    return await this.facultyService.fetchAllCoordinatorsSociety();
  }

  @Get('/societyCoordinator/:societyId')
  async getCoordinatorsBySocietyId(
    @Param('societyId', ParseIntPipe) societyId: number,
  ) {
    return await this.facultyService.fetchCoordinatorBySocietyId(
      Number(societyId),
    );
  }

  @Get('/societyCoordinator/:coordinatorId')
  async getCoordinatorById(
    @Param('coordinatorId', ParseIntPipe) coordinatorId: number,
  ) {
    return await this.facultyService.fetchCoordinatorById(
      Number(coordinatorId),
    );
  }

  @Get('/admin/societyCoordinator')
  async getAllCoordinatorsAdmin() {
    return await this.facultyService.fetchAllCoordinatorsAdmin();
  }

  @Get('/admin/societyCoordinator/:societyId')
  async getCoordinatorsAdminBySocietyId(
    @Param('societyId', ParseIntPipe) societyId: number,
  ) {
    return await this.facultyService.fetchCoordinatorAdminBySocietyId(
      Number(societyId),
    );
  }
}
