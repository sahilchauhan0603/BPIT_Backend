import { Module } from '@nestjs/common';
import { SocietyService } from './society.service';
import { SocietyController } from './society.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [SocietyService, PrismaService],
  controllers: [SocietyController],
})
export class SocietyModule {}
