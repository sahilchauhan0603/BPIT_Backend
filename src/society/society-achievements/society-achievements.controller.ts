import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
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
      Number(achievementID),
      updateSocietyAchievementDto,
    );
  }

  //admin panel
  @Get('/admin/achievements')
  async getAllAchievements(@Query('page') page: string = '1') {
    const pageNumber = parseInt(page, 10) || 1;
    return await this.societyAchievementsService.findAll(pageNumber);
  }

  @Get('/admin/achievements/:societyID')
  async getAchievementsBySocietyID(@Param('societyID') societyID: number) {
    return await this.societyAchievementsService.findBySocietyID(
      Number(societyID),
    );
  }

  @Delete('/achievements/achievement/:achievementID')
  async removeAchievementByID(@Param('achievementID') achievementID: number) {
    return await this.societyAchievementsService.removeByAchievementID(
      Number(achievementID),
    );
  }

  @Delete('/achievements/society/:societyID')
  async removeAchievementsBySocietyID(@Param('societyID') societyID: number) {
    return await this.societyAchievementsService.removeBySocietyID(
      Number(societyID),
    );
  }
}
