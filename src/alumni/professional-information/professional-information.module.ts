import { Module } from '@nestjs/common';
import { ProfessionalInformationController } from './professional-information.controller';
import { ProfessionalInformationService } from './professional-information.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProfessionalInformationController],
  providers: [ProfessionalInformationService, PrismaService],
})
export class ProfessionalInformationModule {}
