import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { DatabaseModule } from 'src/database/database.module';


@Module({
  imports:[DatabaseModule,],
  controllers: [LevelController],
  providers: [LevelService],
})
export class LevelModule {}
