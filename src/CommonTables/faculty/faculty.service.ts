import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';

@Injectable()
export class FacultyService {
  constructor(private readonly prisma: PrismaService) {}

  async createFaculty(createFacultyDto: CreateFacultyDto) {
    const { resigningDate, others, ...rest } = createFacultyDto;

    return await this.prisma.faculty.create({
      data: {
        ...rest,
        resigningDate: resigningDate || null, // Default value is set to `null`,
        others: others || 'N/A', // Default value if not provided
      },
    });
  }

  async getAllFaculties() {
    return await this.prisma.faculty.findMany();
  }

  async getFacultyById(id: number) {
    const faculty = await this.prisma.faculty.findUnique({
      where: { facultyId: id },
    });

    if (!faculty) {
      throw new NotFoundException(`Faculty with ID ${id} not found`);
    }

    return faculty;
  }

  async updateFaculty(id: number, updateFacultyDto: UpdateFacultyDto) {
    const existingFaculty = await this.getFacultyById(id);

    if (!existingFaculty) {
      throw new NotFoundException(`Faculty with ID ${id} not found`);
    }

    return await this.prisma.faculty.update({
      where: { facultyId: id },
      data: updateFacultyDto,
    });
  }

  async deleteFaculty(id: number) {
    const existingFaculty = await this.getFacultyById(id);

    if (!existingFaculty) {
      throw new NotFoundException(`Faculty with ID ${id} not found`);
    }

    await this.prisma.faculty.delete({
      where: { facultyId: id },
    });

    return { message: `Faculty with ID ${id} deleted successfully` };
  }
}
