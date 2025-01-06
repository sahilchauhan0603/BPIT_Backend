import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ProfessionalInformationService } from './professional-information.service';
import {
  CreateProfessionalInformationDto,
  UpdateProfessionalInformationDto,
} from './dto/index';

@Controller('professional-information')
export class ProfessionalInformationController {
  constructor(
    private readonly professionalInformationService: ProfessionalInformationService,
  ) {}

  @Post()
  async create(
    @Body() createProfessionalInformationDto: CreateProfessionalInformationDto,
  ) {
    return await this.professionalInformationService.create(
      createProfessionalInformationDto,
    );
  }

  @Get()
  async findAll(@Query('role') role?: string) {
    return await this.professionalInformationService.findAll(role);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const professionalId = parseInt(id, 10);
    if (isNaN(professionalId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.professionalInformationService.findOne(professionalId);
  }

  @Get('user/:userId')
  async findAllByUserId(@Param('userId') userId: string) {
    const userIdInt = parseInt(userId, 10);
    if (isNaN(userIdInt)) {
      throw new BadRequestException('Invalid User ID format');
    }
    return await this.professionalInformationService.findAllByUserId(userIdInt);
  }

  @Get('current-company/:userId')
  async findCurrentCompany(@Param('userId') userId: string) {
    const userIdInt = parseInt(userId, 10);
    if (isNaN(userIdInt)) {
      throw new BadRequestException('Invalid User ID format');
    }
    return await this.professionalInformationService.findCurrentCompanyByUserId(
      userIdInt,
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProfessionalInformationDto: UpdateProfessionalInformationDto,
  ) {
    const professionalId = parseInt(id, 10);
    if (isNaN(professionalId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.professionalInformationService.update(
      professionalId,
      updateProfessionalInformationDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const professionalId = parseInt(id, 10);
    if (isNaN(professionalId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.professionalInformationService.remove(professionalId);
  }
}
