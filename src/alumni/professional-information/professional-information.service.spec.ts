import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalInformationService } from './professional-information.service';

describe('ProfessionalInformationService', () => {
  let service: ProfessionalInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfessionalInformationService],
    }).compile();

    service = module.get<ProfessionalInformationService>(
      ProfessionalInformationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
