import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/index';
import { Prisma } from '@prisma/client';

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
      data: dto,
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
