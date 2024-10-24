import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { MulterModule } from '@nestjs/platform-express';
import { FILE_UPLOADS_DIR } from 'src/constants';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[
    
    DatabaseModule
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
