import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { SocietyService } from './societyFunctions.service';
import { AddSocietyDto } from './dto';
import { EditSocietyDTO } from './dto';

@Controller('api/v1/societies')
export class SocietyController {
  constructor(private readonly societyService: SocietyService) {}

  @Post()
  async addNewSociety(@Body() createSocietyDto: AddSocietyDto) {
    return await this.societyService.addSociety(createSocietyDto);
  }

  @Put(':societyId')
  async updateSociety(
    @Param('societyId') societyId: number,
    @Body() updateSocietyDto: EditSocietyDTO,
  ) {
    return await this.societyService.updateSociety(
      Number(societyId),
      updateSocietyDto,
    );
  }

  @Get()
  async fetchAllSocieties() {
    return await this.societyService.fetchAllSocieties();
  }

  @Get(':societyId')
  async fetchSocietyById(@Param('societyId') societyId: number) {
    return await this.societyService.fetchSocietyById(Number(societyId));
  }

  @Delete(':societyId')
  async removeSocietyById(@Param('societyId') societyId: number) {
    return await this.societyService.removeSocietyById(Number(societyId));
  }
}
