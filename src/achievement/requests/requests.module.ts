import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [RequestsService, PrismaService],
  controllers: [RequestsController],
})
export class RequestsModule {}
