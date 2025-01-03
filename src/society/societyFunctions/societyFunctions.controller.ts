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

  @Put(':id')
  async updateSociety(
    @Param('id') id: number,
    @Body() updateSocietyDto: EditSocietyDTO,
  ) {
    return await this.societyService.updateSociety(id, updateSocietyDto);
  }

  @Get()
  async fetchAllSocieties() {
    return await this.societyService.fetchAllSocieties();
  }

  @Get(':id')
  async fetchSocietyById(@Param('id') id: number) {
    return await this.societyService.fetchSocietyById(id);
  }

  @Delete(':id')
  async removeSocietyById(@Param('id') id: number) {
    return await this.societyService.removeSocietyById(id);
  }
}
