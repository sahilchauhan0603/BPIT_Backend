import { Test, TestingModule } from '@nestjs/testing';
import { MentorshipApplicationsController } from './mentorship-applications.controller';

describe('MentorshipApplicationsController', () => {
  let controller: MentorshipApplicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MentorshipApplicationsController],
    }).compile();

    controller = module.get<MentorshipApplicationsController>(MentorshipApplicationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
