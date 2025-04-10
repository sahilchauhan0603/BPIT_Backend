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

  async getFacultyById(id: bigint) {
    const faculty = await this.prisma.faculty.findUnique({
      where: { facultyId: id },
    });

    if (!faculty) {
      throw new NotFoundException(`Faculty with ID ${id} not found`);
    }

    return faculty;
  }

  async updateFaculty(id: bigint, updateFacultyDto: UpdateFacultyDto) {
    const existingFaculty = await this.getFacultyById(id);

    if (!existingFaculty) {
      throw new NotFoundException(`Faculty with ID ${id} not found`);
    }

    return await this.prisma.faculty.update({
      where: { facultyId: id },
      data: updateFacultyDto,
    });
  }

  async deleteFaculty(id: bigint) {
    const existingFaculty = await this.getFacultyById(id);

    if (!existingFaculty) {
      throw new NotFoundException(`Faculty with ID ${id} not found`);
    }

    await this.prisma.faculty.delete({
      where: { facultyId: id },
    });

    return { message: `Faculty with ID ${id} deleted successfully` };
  }

  // Fetch all coordinators with society name
  async fetchAllCoordinatorsSociety() {
    return await this.prisma.faculty.findMany({
      select: {
        others: true,
        name: true,
        email: true,
        designation: true,
        profilePictureUrl: true,
        facultyId: true,
        facultySociety: {
          select: {
            societyName: true,
            societyId: true,
          },
        },
      },
    });
  }

  // Fetch coordinators by society ID
  async fetchCoordinatorBySocietyId(societyId: bigint) {
    const coordinators = await this.prisma.faculty.findMany({
      where: {
        facultySociety: {
          some: {
            societyId: societyId, // Filter by societyId in the related SocietyProfile table
          },
        },
      },
      select: {
        others: true,
        name: true,
        email: true,
        designation: true,
        profilePictureUrl: true,
        facultyId: true,
        facultySociety: {
          select: {
            societyName: true,
            societyId: true,
          },
        },
      },
    });

    if (!coordinators.length) {
      throw new NotFoundException(
        `No coordinators found for society ID ${societyId}`,
      );
    }

    return coordinators;
  }

  // Fetch coordinator by coordinator ID
  async fetchCoordinatorById(coordinatorId: bigint) {
    const coordinator = await this.prisma.faculty.findUnique({
      where: { facultyId: coordinatorId },
      select: {
        others: true,
        name: true,
        email: true,
        designation: true,
        profilePictureUrl: true,
        facultyId: true,
        facultySociety: {
          select: {
            societyName: true,
            societyId: true,
          },
        },
      },
    });

    if (!coordinator) {
      throw new NotFoundException(
        `Coordinator with ID ${coordinatorId} not found`,
      );
    }

    return coordinator;
  }

  async fetchAllCoordinatorsAdmin() {
    const coordinators = await this.prisma.faculty.findMany({
      select: {
        facultyId: true,
        facultySociety: {
          select: {
            societyName: true,
            societyId: true,
          },
        },
        others: true,
        name: true,
        designation: true,
      },
    });

    return coordinators;
  }

  async fetchCoordinatorAdminBySocietyId(societyId: bigint) {
    const coordinators = await this.prisma.faculty.findMany({
      where: {
        facultySociety: {
          some: {
            societyId: societyId, // Filter by societyId in the related SocietyProfile table
          },
        },
      },
      select: {
        facultyId: true,
        facultySociety: {
          select: {
            societyName: true,
            societyId: true,
          },
        },
        others: true,
        name: true,
        designation: true,
      },
    });

    if (!coordinators.length) {
      throw new NotFoundException(
        `No coordinators found for society ID ${societyId}`,
      );
    }

    return coordinators;
  }
}
