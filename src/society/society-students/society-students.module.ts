import { Module } from '@nestjs/common';
import { SocietyStudentsController } from './society-students.controller';
import { SocietyStudentsService } from './society-students.service';

@Module({
  controllers: [SocietyStudentsController],
  providers: [SocietyStudentsService],
})
export class SocietyStudentsModule {}
