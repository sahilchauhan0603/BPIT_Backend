import { Module } from '@nestjs/common';
import { MentorshipProgramController } from './mentorship-program.controller';
import { MentorshipProgramService } from './mentorship-program.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MentorshipProgramController],
  providers: [MentorshipProgramService, PrismaService]
})
export class MentorshipProgramModule {}
