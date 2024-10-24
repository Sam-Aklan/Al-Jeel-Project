import { Test, TestingModule } from '@nestjs/testing';
import { LevelCourseService } from './level-course.service';

describe('LevelCourseService', () => {
  let service: LevelCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LevelCourseService],
    }).compile();

    service = module.get<LevelCourseService>(LevelCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
