import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { SocietyAchievementsService } from './society-achievements.service';
import { CreateSocietyAchievementDto } from './dto/create-society-achievement.dto';
import { UpdateSocietyAchievementDto } from './dto/update-society-achievement.dto';

@Controller('society-achievements')
export class SocietyAchievementsController {
  constructor(
    private readonly societyAchievementsService: SocietyAchievementsService,
  ) {}

  @Post()
  async addNewAchievement(
    @Body() createSocietyAchievementDto: CreateSocietyAchievementDto,
  ) {
    return await this.societyAchievementsService.create(
      createSocietyAchievementDto,
    );
  }

  @Put(':achievementID')
  async updateAchievement(
    @Param('achievementID') achievementID: number,
    @Body() updateSocietyAchievementDto: UpdateSocietyAchievementDto,
  ) {
    return await this.societyAchievementsService.update(
      achievementID,
      updateSocietyAchievementDto,
    );
  }

  @Get()
  async getAllAchievements() {
    return await this.societyAchievementsService.findAll();
  }

  @Get(':societyID')
  async getAchievementsBySocietyID(@Param('societyID') societyID: number) {
    return await this.societyAchievementsService.findBySocietyID(societyID);
  }

  @Delete(':achievementID')
  async removeAchievementByID(@Param('achievementID') achievementID: number) {
    return await this.societyAchievementsService.removeByAchievementID(
      achievementID,
    );
  }

  @Delete('society/:societyID')
  async removeAchievementsBySocietyID(@Param('societyID') societyID: number) {
    return await this.societyAchievementsService.removeBySocietyID(societyID);
  }
}
