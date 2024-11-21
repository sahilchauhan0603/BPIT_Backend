import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SocietyService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllSociety() {
    return this.prisma.user.findMany();
  }
}
