import { Test, TestingModule } from '@nestjs/testing';
import { MentorshipProgramService } from './mentorship-program.service';

describe('MentorshipProgramService', () => {
  let service: MentorshipProgramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MentorshipProgramService],
    }).compile();

    service = module.get<MentorshipProgramService>(MentorshipProgramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
