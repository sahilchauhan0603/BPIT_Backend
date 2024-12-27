import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AddAchievementDTO, EditAchievementDTO } from './dto';

@Controller('achievements')
export class AchievementsController {
    constructor (private readonly achievementsService: AchievementsService) {}

    @Post('add')
    async addAchievement(@Body() dto: AddAchievementDTO){
        return this.achievementsService.addAchievement(dto);
    }

    @Patch(':id')
    async addCertificate(@Param('id') achievementId: string) {}

    @Patch('edit/:id')
    async editAchievement(@Param('id') achievementId: string, @Body() dto: EditAchievementDTO) {}

    @Delete(':id')
    async deleteAchievement(@Param('id') achievementId: string) {}

    @Get(':id')
    async getAchievement(@Param('id') achievementId: string) {}

    @Get('all')
    async getAllAchievements() {}


}
