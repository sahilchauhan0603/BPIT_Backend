import { Test, TestingModule } from '@nestjs/testing';
import { MailservicesController } from './mailservices.controller';

describe('MailservicesController', () => {
  let controller: MailservicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailservicesController],
    }).compile();

    controller = module.get<MailservicesController>(MailservicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
