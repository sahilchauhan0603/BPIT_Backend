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

@Controller('api/v1')
export class SocietyAchievementsController {
  constructor(
    private readonly societyAchievementsService: SocietyAchievementsService,
  ) {}

  @Post('/achievements')
  async addNewAchievement(
    @Body() createSocietyAchievementDto: CreateSocietyAchievementDto,
  ) {
    return await this.societyAchievementsService.create(
      createSocietyAchievementDto,
    );
  }

  @Put('/achievements/:achievementID')
  async updateAchievement(
    @Param('achievementID') achievementID: number,
    @Body() updateSocietyAchievementDto: UpdateSocietyAchievementDto,
  ) {
    return await this.societyAchievementsService.update(
      achievementID,
      updateSocietyAchievementDto,
    );
  }

  //admin panel
  @Get('/admin/achievements')
  async getAllAchievements() {
    return await this.societyAchievementsService.findAll();
  }

  @Get('/admin/achievements/:societyID')
  async getAchievementsBySocietyID(@Param('societyID') societyID: number) {
    return await this.societyAchievementsService.findBySocietyID(societyID);
  }

  @Delete('/achievements/:achievementID')
  async removeAchievementByID(@Param('achievementID') achievementID: number) {
    return await this.societyAchievementsService.removeByAchievementID(
      achievementID,
    );
  }

  @Delete('/achievements/:societyID')
  async removeAchievementsBySocietyID(@Param('societyID') societyID: number) {
    return await this.societyAchievementsService.removeBySocietyID(societyID);
  }
}
