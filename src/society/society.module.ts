import { Module } from '@nestjs/common';
import { SocietyService } from './society.service';
import { SocietyController } from './society.controller';

@Module({
  providers: [SocietyService],
  controllers: [SocietyController],
})
export class SocietyModule {}
