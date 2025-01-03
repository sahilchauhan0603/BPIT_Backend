import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/index';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    let item: any;
    item = await this.prisma.user.findFirst({
      where: {
        enrollmentNumber: dto.enrollmentNumber,
        email: dto.email,
        mobile: dto.mobile,
      },
    });
    if (item) return { status: 'error', message: 'user already exists!' };
    item = await this.prisma.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        mobile: dto.mobile,
        enrollmentNumber: dto.enrollmentNumber,
        password: dto.password,
        role: dto.role,
        section: dto.section,
        passingYear: dto.passingYear,
        fathersName: dto.fathersName,
        mothersName: dto.mothersName,
        hobby: dto.hobby,
        parentsPhone: dto.parentsPhone,
        facultyId: dto.facultyId,
      },
    });
    return {
      status: 'success',
      item,
      message: 'User added successfully',
    };
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { userId: id } });
  }

  update(id: number, Dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { userId: id },
      data: Dto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { userId: id } });
  }
}
