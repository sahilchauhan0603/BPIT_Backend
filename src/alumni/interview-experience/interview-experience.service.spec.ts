import { Test, TestingModule } from '@nestjs/testing';
import { InterviewExperienceService } from './interview-experience.service';

describe('InterviewExperienceService', () => {
  let service: InterviewExperienceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterviewExperienceService],
    }).compile();

    service = module.get<InterviewExperienceService>(InterviewExperienceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
