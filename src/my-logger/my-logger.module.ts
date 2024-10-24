import { Module } from '@nestjs/common';
import { MyLoggerService } from './my-logger.service';

@Module({
  controllers: [],
  providers: [MyLoggerService],
  exports:[MyLoggerService]
})
export class MyLoggerModule {}
