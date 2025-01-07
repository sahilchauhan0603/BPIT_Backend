import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { StudentAchievementService } from './society-students-achievements.service';
import { CreateStudentAchievementDto } from './dto/create-society-students-achievement.dto';
import { UpdateStudentAchievementDto } from './dto/update-society-students-achievement.dto';

@Controller('api/v1')
export class StudentAchievementController {
  constructor(private readonly achievementService: StudentAchievementService) {}

  @Post('/societyStudentAchievement')
  async addNewAchievement(@Body() createDto: CreateStudentAchievementDto) {
    return this.achievementService.addAchievement(createDto);
  }

  @Put('/societyStudentAchievement/:achievementId')
  async updateAchievement(
    @Param('achievementId') achievementId: number,
    @Body() updateDto: UpdateStudentAchievementDto,
  ) {
    return this.achievementService.updateAchievement(
      Number(achievementId),
      updateDto,
    );
  }

  @Get('/societyStudentAchievement')
  async fetchAllAchievements() {
    return this.achievementService.getAllAchievements();
  }

  @Get('/societyStudentAchievement/enrollmentNo/:enrollmentNo')
  async fetchAchievementsByEnrollment(
    @Param('enrollmentNo') enrollmentNo: number,
  ) {
    return this.achievementService.getAchievementsByEnrollment(
      Number(enrollmentNo),
    );
  }

  @Get('/societyStudentAchievement/society/:societyId')
  async fetchAchievementsBySocietyId(@Param('societyId') societyId: number) {
    return this.achievementService.getAchievementsBySocietyId(
      Number(societyId),
    );
  }

  @Delete('/societyStudentAchievement/:enrollmentNo')
  async removeAchievement(@Param('enrollmentNo') enrollmentNo: number) {
    return this.achievementService.removeAchievement(Number(enrollmentNo));
  }
}
