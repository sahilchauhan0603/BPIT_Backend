import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AddAchievementDTO, EditAchievementDTO } from './dto';
import { JwtGuard } from '../auth/guards';
import { GetUser } from '../auth/decorator';

@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}
  @UseGuards(JwtGuard)
  @Post('add')
  async addAchievement(
    @Body() dto: AddAchievementDTO,
    @GetUser('id') userId: number,
    @GetUser('mentor') mentorId: number
  ) {
    return this.achievementsService.addAchievement(dto, userId, mentorId);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async addCertificate(@Param('id') achievementId: number) {
    return this.achievementsService.addCertificate(achievementId);
  }

  @UseGuards(JwtGuard)
  @Patch('edit/:id')
  async editAchievement(
    @Param('id') achievementId: number,
    @Body() dto: EditAchievementDTO,
  ) {
    return this.achievementsService.editAchievement(achievementId, dto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteAchievement(@Param('id') achievementId: number) {
    return this.achievementsService.deleteAchievement(achievementId);
  }

  @Get(':id')
  async getAchievement(@Param('id') achievementId: number) {
    return this.achievementsService.getAchievement(achievementId);
  }

  @Get('all')
  async getAllAchievements(@GetUser('id') userId: number) {
    return this.achievementsService.getAllAchievements(userId);
  }
}
