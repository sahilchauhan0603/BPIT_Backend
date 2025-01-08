import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { SocietyTestimonialsService } from './society-students-testimonials.service';
import { CreateSocietyTestimonialDto } from './dto/create-society-testimonial.dto';
import { UpdateSocietyTestimonialDto } from './dto/update-society-testimonial.dto';

@Controller('api/v1')
export class SocietyTestimonialsController {
  constructor(private service: SocietyTestimonialsService) {}

  @Post('/societyTestimonials')
  async addNewTestimonial(@Body() createDto: CreateSocietyTestimonialDto) {
    return await this.service.addNewTestimonial(createDto);
  }

  @Put('/societyTestimonials/:id')
  async updateTestimonial(
    @Param('id') id: number,
    @Body() updateDto: UpdateSocietyTestimonialDto,
  ) {
    return await this.service.updateTestimonial(Number(id), updateDto);
  }

  @Get('/societyTestimonials')
  async fetchAllTestimonials() {
    return await this.service.fetchAllTestimonials();
  }

  @Get('/societyTestimonials/:id')
  async fetchTestimonialById(@Param('id') id: number) {
    return await this.service.fetchTestimonialById(Number(id));
  }

  @Get('/societyTestimonials/society/:societyId')
  async fetchTestimonialsBySocietyId(@Param('societyId') societyId: number) {
    return await this.service.fetchTestimonialsBySocietyId(Number(societyId));
  }

  @Get('/societyTestimonials/enrollmentNo/:enrollmentNo')
  async getTestimonialsByEnrollment(
    @Param('enrollmentNo') enrollmentNo: number,
  ) {
    return await this.service.getTestimonialsByEnrollment(Number(enrollmentNo));
  }

  @Delete('/societyTestimonials/:id')
  async removeTestimonialById(@Param('id') id: number) {
    return await this.service.removeTestimonialById(Number(id));
  }

  @Delete('/societyTestimonials/society/:societyId')
  async removeTestimonialsBySocietyId(@Param('societyId') societyId: number) {
    return await this.service.removeTestimonialsBySocietyId(Number(societyId));
  }

  //ADMIN PANEL
  @Get('/admin/societyTestimonials')
  async fetchAllTestimonialsAdminPanel() {
    return await this.service.fetchAllTestimonialsAdmin();
  }

  @Get('/admin/societyTestimonials/:societyId')
  async fetchTestimonialsAdminPanelBySocietyId(
    @Param('societyId') societyId: number,
  ) {
    return await this.service.fetchTestimonialsAdminBySocietyId(
      Number(societyId),
    );
  }
}
