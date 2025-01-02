import { Module } from '@nestjs/common';
import { SocietyEventsController } from './society-events.controller';
import { SocietyEventsService } from './society-events.service';

@Module({
  controllers: [SocietyEventsController],
  providers: [SocietyEventsService],
})
export class SocietyEventsModule {}
