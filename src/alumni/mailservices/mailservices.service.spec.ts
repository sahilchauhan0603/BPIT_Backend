import { Test, TestingModule } from '@nestjs/testing';
import { MailservicesService } from './mailservices.service';

describe('MailservicesService', () => {
  let service: MailservicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailservicesService],
    }).compile();

    service = module.get<MailservicesService>(MailservicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
