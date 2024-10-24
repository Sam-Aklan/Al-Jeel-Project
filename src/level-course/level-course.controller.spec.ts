import { Test, TestingModule } from '@nestjs/testing';
import { LevelCourseController } from './level-course.controller';
import { LevelCourseService } from './level-course.service';

describe('LevelCourseController', () => {
  let controller: LevelCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LevelCourseController],
      providers: [LevelCourseService],
    }).compile();

    controller = module.get<LevelCourseController>(LevelCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
