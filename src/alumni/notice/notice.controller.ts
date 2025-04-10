import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto, UpdateNoticeDto } from './dto/index';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}
  @Post()
  async create(@Body() createNoticeDto: CreateNoticeDto) {
    return await this.noticeService.create(createNoticeDto);
  }

  @Get()
  async findAll(@Query('page') page: string = '1') {
    const pageNumber = parseInt(page, 10) || 1;
    return await this.noticeService.getAll(pageNumber);
  }
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNoticeDto: UpdateNoticeDto,
  ) {
    let noticeId : bigint
    try {
      noticeId = BigInt(id)
    } catch (error) {
      throw new BadRequestException('Invalid id')
    }
    return await this.noticeService.update(noticeId, updateNoticeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let noticeId : bigint
    try {
      noticeId = BigInt(id)
    } catch (error) {
      throw new BadRequestException('Invalid id')
    }
    return await this.noticeService.remove(noticeId);
  }
}
