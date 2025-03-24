import { Test, TestingModule } from '@nestjs/testing';
import { MentorshipProgramController } from './mentorship-program.controller';

describe('MentorshipProgramController', () => {
  let controller: MentorshipProgramController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MentorshipProgramController],
    }).compile();

    controller = module.get<MentorshipProgramController>(MentorshipProgramController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
