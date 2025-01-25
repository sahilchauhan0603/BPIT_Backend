import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSocietyTestimonialDto } from './dto/create-society-testimonial.dto';
import { UpdateSocietyTestimonialDto } from './dto/update-society-testimonial.dto';

@Injectable()
export class SocietyTestimonialsService {
  constructor(private prisma: PrismaService) {}

  async addNewTestimonial(createDto: CreateSocietyTestimonialDto) {
    return await this.prisma.societyTestimonial.create({
      data: {
        societyTestimonialId: createDto.societyTestimonialId,
        societyId: createDto.societyId,
        userId: createDto.userId,
        description: createDto.description,
      },
    });
  }

  async updateTestimonial(
    testimonialId: number,
    updateDto: UpdateSocietyTestimonialDto,
  ) {
    const testimonial = await this.prisma.societyTestimonial.findUnique({
      where: { societyTestimonialId: testimonialId },
    });

    if (!testimonial) {
      throw new NotFoundException(
        `Testimonial with ID ${testimonialId} not found`,
      );
    }

    return await this.prisma.societyTestimonial.update({
      where: { societyTestimonialId: testimonialId },
      data: updateDto,
    });
  }

  async fetchAllTestimonials() {
    return await this.prisma.societyTestimonial.findMany({
      orderBy: { societyTestimonialId: 'asc' },
      select: {
        societyId: true,
        description: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            enrollmentNumber: true,
            branch: true,
            passingYear: true,
            profilePictureUrl: true,
          },
        },
      },
    });
  }

  async fetchTestimonialById(testimonialId: number) {
    const testimonial = await this.prisma.societyTestimonial.findMany({
      where: { societyTestimonialId: testimonialId },
      select: {
        societyId: true,
        description: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            enrollmentNumber: true,
            branch: true,
            passingYear: true,
            profilePictureUrl: true,
          },
        },
      },
    });

    if (!testimonial) {
      throw new NotFoundException(
        `Testimonial with ID ${testimonialId} not found`,
      );
    }

    return testimonial;
  }

  async fetchTestimonialsBySocietyId(societyId: number) {
    return await this.prisma.societyTestimonial.findMany({
      where: { societyId: societyId },
      select: {
        societyId: true,
        description: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            enrollmentNumber: true,
            branch: true,
            passingYear: true,
            profilePictureUrl: true,
          },
        },
      },
    });
  }

  async getTestimonialsByEnrollment(enrollmentNo: number) {
    // Fetch the testimonials using a join with the users table
    const testimonials = await this.prisma.societyTestimonial.findMany({
      where: {
        user: {
          enrollmentNumber: enrollmentNo, // Assuming `enrollmentNumber` is a field in the users table
        },
      },
      select: {
        societyTestimonialId: true,
        societyId: true,
        description: true, // Include specific fields from societyTestimonial
        user: {
          select: {
            firstName: true,
            lastName: true,
            enrollmentNumber: true,
            branch: true,
            passingYear: true,
            profilePictureUrl: true,
          },
        },
      },
    });

    if (testimonials.length === 0) {
      throw new NotFoundException(
        `No testimonials found for enrollment number ${enrollmentNo}`,
      );
    }

    return testimonials;
  }

  async removeTestimonialById(testimonialId: number) {
    const testimonial = await this.prisma.societyTestimonial.findUnique({
      where: { societyTestimonialId: testimonialId },
    });

    if (!testimonial) {
      throw new NotFoundException(
        `Testimonial with ID ${testimonialId} not found`,
      );
    }

    await this.prisma.societyTestimonial.delete({
      where: { societyTestimonialId: testimonialId },
    });

    return { message: 'Testimonial successfully deleted' };
  }

  async removeTestimonialsBySocietyId(societyId: number) {
    const result = await this.prisma.societyTestimonial.deleteMany({
      where: { societyId },
    });

    if (result.count === 0) {
      throw new NotFoundException(
        `No testimonials found for society ID ${societyId}`,
      );
    }

    return { message: 'Testimonials successfully deleted' };
  }

  //ADMIN PANEL
  async fetchAllTestimonialsAdmin() {
    return await this.prisma.societyTestimonial.findMany({
      orderBy: { societyTestimonialId: 'asc' },
      select: {
        societyId: true,
        description: true,
        societyTestimonialId: true,
        user: {
          select: {
            enrollmentNumber: true,
          },
        },
      },
    });
  }

  async fetchTestimonialsAdminBySocietyId(societyId: number) {
    return await this.prisma.societyTestimonial.findMany({
      where: { societyId: societyId },
      select: {
        societyId: true,
        description: true,
        societyTestimonialId: true,
        user: {
          select: {
            enrollmentNumber: true,
          },
        },
      },
    });
  }
}
