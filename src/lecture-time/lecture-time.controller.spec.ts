import { Test, TestingModule } from '@nestjs/testing';
import { LectureTimeController } from './lecture-time.controller';
import { LectureTimeService } from './lecture-time.service';

describe('LectureTimeController', () => {
  let controller: LectureTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LectureTimeController],
      providers: [LectureTimeService],
    }).compile();

    controller = module.get<LectureTimeController>(LectureTimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
