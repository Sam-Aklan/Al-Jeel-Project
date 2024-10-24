import { Module } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { LectureController } from './lecture.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule,],
  controllers: [LectureController],
  providers: [LectureService],
})
export class LectureModule {}
