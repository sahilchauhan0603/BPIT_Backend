import { Module } from '@nestjs/common';
import { ProfessionalInformationController } from './professional-information.controller';
import { ProfessionalInformationService } from './professional-information.service';

@Module({
  controllers: [ProfessionalInformationController],
  providers: [ProfessionalInformationService]
})
export class ProfessionalInformationModule {}
