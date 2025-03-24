import { Module } from '@nestjs/common';
import { MentorshipProgramController } from './mentorship-program.controller';
import { MentorshipProgramService } from './mentorship-program.service';

@Module({
  controllers: [MentorshipProgramController],
  providers: [MentorshipProgramService]
})
export class MentorshipProgramModule {}
