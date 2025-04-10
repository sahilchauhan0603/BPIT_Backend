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
  async getFacultyById(@Param('id') id: string) {
    return this.facultyService.getFacultyById(BigInt(id));
  }

  @Put('/faculty/:id')
  async updateFaculty(
    @Param('id') id: string,
    @Body() updateFacultyDto: UpdateFacultyDto,
  ) {
    return this.facultyService.updateFaculty(BigInt(id), updateFacultyDto);
  }

  @Delete('/faculty/:id')
  async deleteFaculty(@Param('id') id: string) {
    return this.facultyService.deleteFaculty(BigInt(id));
  }

  @Get('/societyCoordinator')
  async getAllCoordinators() {
    return await this.facultyService.fetchAllCoordinatorsSociety();
  }

  @Get('/societyCoordinator/:societyId')
  async getCoordinatorsBySocietyId(
    @Param('societyId') societyId: string,
  ) {
    return await this.facultyService.fetchCoordinatorBySocietyId(
      BigInt(societyId),
    );
  }

  @Get('/societyCoordinator/:coordinatorId')
  async getCoordinatorById(
    @Param('coordinatorId') coordinatorId: string,
  ) {
    return await this.facultyService.fetchCoordinatorById(
      BigInt(coordinatorId),
    );
  }

  @Get('/admin/societyCoordinator')
  async getAllCoordinatorsAdmin() {
    return await this.facultyService.fetchAllCoordinatorsAdmin();
  }

  @Get('/admin/societyCoordinator/:societyId')
  async getCoordinatorsAdminBySocietyId(
    @Param('societyId') societyId: string,
  ) {
    return await this.facultyService.fetchCoordinatorAdminBySocietyId(
      BigInt(societyId),
    );
  }
}
