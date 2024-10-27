import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { FILE_UPLOADS_DIR } from './constants';
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const {httpAdapter} = app.get(HttpAdapterHost)
  app.enableCors({origin:[
    process.env.LOCAL_CLIENT,
    process.env.PROD_CLIENT
    ]})
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
  app.setGlobalPrefix('api')
  app.useStaticAssets(FILE_UPLOADS_DIR,{
    prefix:"/uploads/"
  })
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  
  await app.listen(3000);
}
bootstrap();
