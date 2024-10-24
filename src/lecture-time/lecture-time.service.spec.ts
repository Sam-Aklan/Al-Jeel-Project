import { Test, TestingModule } from '@nestjs/testing';
import { LectureTimeService } from './lecture-time.service';

describe('LectureTimeService', () => {
  let service: LectureTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LectureTimeService],
    }).compile();

    service = module.get<LectureTimeService>(LectureTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
