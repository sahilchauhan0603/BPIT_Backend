import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AddAchievementImageDto, AddAchievemntDto, UpdateAchievementDto, UpdateAchievementImageDto } from './dto/index';

@Controller('alumni/achievements')
export class AchievementsController {
    constructor(private readonly achievementsService: AchievementsService) {}
    // create new Achievment
    @Post()
    async createAchievement(
        @Body() createAchievementDto: AddAchievemntDto
    ) {
        return this.achievementsService.create(createAchievementDto);
    }
    // Get All Achievment
    @Get()
    async getAllAchievement(
        @Query('role') role?: string, @Query('page') page: string = '1'
    ) {
        const pageNumber = parseInt(page, 10) || 1;
        return await this.achievementsService.findAll(pageNumber, role);
    }
    // Get Achievement By Id
    @Get(':id')
    async getAchievementById(@Param('id') id: string) {
        const achievementId = parseInt(id,10);
        if(isNaN(achievementId)){
            throw new BadRequestException('Invalid ID format');
        }
        return await this.achievementsService.findOne(achievementId);
    }
    @Get('/user/:id')
    async getAchievementsByUserId(@Param('id') id: string) {
        const userId = parseInt(id,10);
        if(isNaN(userId)){
            throw new BadRequestException('Invalid ID format');
        }
        return await this.achievementsService.findByUserId(userId);
    }
    @Put(':id')
    async updateAchievement(
        @Param('id') id: string,
        @Body() updateAchievementDto: UpdateAchievementDto
    ){
        const achievementId = parseInt(id,10);
        if(isNaN(achievementId)){
            throw new BadRequestException('Invalid ID format');
        }
        return this.achievementsService.update(achievementId, updateAchievementDto);
    }
    @Delete(':id')
    async deleteAchievement(@Param('id') id: string) {
        const achievementId = parseInt(id,10);
        if(isNaN(achievementId)){
            throw new BadRequestException('Invalid ID format');
        }
        return await this.achievementsService.remove(achievementId);
    }

    // Add Image
    @Post()
    async addImage(@Body() addAchievementImageDto : AddAchievementImageDto) {
        return await this.achievementsService.addImage(addAchievementImageDto);
    }
    // Get All Images of Achievemnt
    @Get('/images/:id')
    async getAllImages(
        @Param('id') id: string
    ) {
        const achievementId = parseInt(id,10);
        if(isNaN(achievementId)){
            throw new BadRequestException('Invalid ID format');
        }
        return await this.achievementsService.findAllImage(achievementId);
    }

    // Update Image 
    @Put('/images/:id')
    async updateImage(
        @Param('id') id: string,
        @Body() updateAchievementImageDto: UpdateAchievementImageDto
    ){
        const achievementImageId = parseInt(id,10);
        if(isNaN(achievementImageId)){
            throw new BadRequestException('Invalid ID format');
        }
        return await this.achievementsService.updateImage(achievementImageId,updateAchievementImageDto);
    }

    // Delete Image
    @Delete('/image/:id')
    async deleteImage(
        @Param('id') id: string
    ){
        const achievementImageId = parseInt(id,10);
        if(isNaN(achievementImageId)){
            throw new BadRequestException('Invalid ID format');
        }
        return await this.achievementsService.removeImage(achievementImageId);
    }

    // Delete All Images of given Achievement
    @Delete('/images/:id')
    async deleteAllImages(
        @Param('id') id: string
    ){
        const achievementId = parseInt(id,10);
        if(isNaN(achievementId)){
            throw new BadRequestException('Invalid ID format');
        }
        return await this.achievementsService.removeImage(achievementId);
    }
        

}
