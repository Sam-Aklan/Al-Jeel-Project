import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LevelModule } from './level/level.module';
import { CourseModule } from './course/course.module';
import { TeacherModule } from './teacher/teacher.module';
import { LectureModule } from './lecture/lecture.module';
import { DatabaseModule } from './database/database.module';
import { LectureTimeModule } from './lecture-time/lecture-time.module';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { LevelCourseModule } from './level-course/level-course.module';
import { StudentModule } from './student/student.module';
import { MulterModule } from '@nestjs/platform-express';
import { FILE_UPLOADS_DIR } from './constants';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';


@Module({
  imports: [LevelModule, CourseModule, TeacherModule, LectureModule, DatabaseModule, LectureTimeModule, MyLoggerModule, LevelCourseModule, StudentModule,
    MulterModule.register({
      dest:FILE_UPLOADS_DIR
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
