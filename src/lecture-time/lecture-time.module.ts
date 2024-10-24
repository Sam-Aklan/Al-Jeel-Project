import { Module } from '@nestjs/common';
import { LectureTimeService } from './lecture-time.service';
import { LectureTimeController } from './lecture-time.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [LectureTimeController],
  providers: [LectureTimeService],
})
export class LectureTimeModule {}
