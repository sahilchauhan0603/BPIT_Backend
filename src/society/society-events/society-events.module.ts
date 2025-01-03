import { Module } from '@nestjs/common';
import { SocietyEventsController } from './society-events.controller';
import { SocietyEventsService } from './society-events.service';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [SocietyEventsController],
  providers: [SocietyEventsService, PrismaService],
})
export class SocietyEventsModule {}
