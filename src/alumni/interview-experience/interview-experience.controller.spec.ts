import { Test, TestingModule } from '@nestjs/testing';
import { InterviewExperienceController } from './interview-experience.controller';

describe('InterviewExperienceController', () => {
  let controller: InterviewExperienceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterviewExperienceController],
    }).compile();

    controller = module.get<InterviewExperienceController>(InterviewExperienceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
