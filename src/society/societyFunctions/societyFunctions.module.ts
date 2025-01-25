import { Module } from '@nestjs/common';
import { SocietyController } from './societyFunctions.controller';
import { SocietyService } from './societyFunctions.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SocietyController],
  providers: [SocietyService, PrismaService],
})
export class SocietyFunctionsModule {}
