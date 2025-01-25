import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentMarkingDto } from './dto/create-student-marking.dto';
import { UpdateStudentMarkingDto } from './dto/update-student-marking.dto';

@Injectable()
export class StudentMarkingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStudentMarkingDto: CreateStudentMarkingDto) {
    return this.prisma.studentMarking.create({
      data: {
        userId: createStudentMarkingDto.userId,
        societyId: createStudentMarkingDto.societyId,
        studentGrades: createStudentMarkingDto.studentGrades,
      },
    });
  }

  async update(
    markingId: number,
    updateStudentMarkingDto: UpdateStudentMarkingDto,
  ) {
    const existingMarking = await this.prisma.studentMarking.findUnique({
      where: { markingId: markingId },
    });

    if (!existingMarking) {
      throw new NotFoundException(
        `Marking with markingId ${markingId} not found`,
      );
    }

    return this.prisma.studentMarking.update({
      where: { markingId: markingId },
      data: updateStudentMarkingDto,
    });
  }

  async findAll() {
    return this.prisma.studentMarking.findMany();
  }

  async findBySocietyID(societyID: number) {
    return this.prisma.studentMarking.findMany({
      where: { societyId: societyID },
    });
  }

  async remove(enrollmentNo: number) {
    const existingMarking = await this.prisma.user.findUnique({
      where: { enrollmentNumber: enrollmentNo },
      select: { userId: true },
    });

    if (!existingMarking) {
      throw new NotFoundException(
        `Marking with enrollmentNo ${enrollmentNo} not found`,
      );
    }

    // Delete achievements linked to the userId
    const result = await this.prisma.studentMarking.deleteMany({
      where: { userId: existingMarking.userId },
    });

    if (result.count === 0) {
      throw new NotFoundException(
        `No student markings found for enrollment number ${enrollmentNo}`,
      );
    }

    return { message: 'student marking successfully deleted' };
  }
}
