import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalInformationController } from './professional-information.controller';

describe('ProfessionalInformationController', () => {
  let controller: ProfessionalInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessionalInformationController],
    }).compile();

    controller = module.get<ProfessionalInformationController>(ProfessionalInformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
