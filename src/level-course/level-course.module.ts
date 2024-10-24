import { Module } from '@nestjs/common';
import { LevelCourseService } from './level-course.service';
import { LevelCourseController } from './level-course.controller';
import {DatabaseModule} from 'src/database/database.module'
@Module({
  imports:[DatabaseModule],
  controllers: [LevelCourseController],
  providers: [LevelCourseService],
})
export class LevelCourseModule {}
