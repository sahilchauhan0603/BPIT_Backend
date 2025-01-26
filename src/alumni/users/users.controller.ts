import {
  Controller,
  Get,
  Patch,
  Delete,
  Post,
  Param,
  Body,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/index';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Query('role') role?: string, @Query('page') page: string = '1') {
    const pageNumber = parseInt(page, 10) || 1;
    return await this.usersService.findAll(role, pageNumber);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.usersService.findOne(userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.usersService.update(userId, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.usersService.remove(userId);
  }
}
