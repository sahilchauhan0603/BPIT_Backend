import { Test, TestingModule } from '@nestjs/testing';
import { MentorshipApplicationsService } from './mentorship-applications.service';

describe('MentorshipApplicationsService', () => {
  let service: MentorshipApplicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MentorshipApplicationsService],
    }).compile();

    service = module.get<MentorshipApplicationsService>(MentorshipApplicationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
