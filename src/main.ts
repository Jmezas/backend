import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { JwtErrorFilter } from './common/filters/jwt-error.filter';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
async function bootstrap() {
  const app = await NestFactory.create(AppModule); 
  app.use(helmet());
  app.enableCors(
    //   {
    //   origin:['*'],
    //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    //   credentials: true,
    // }
  )

  app.useGlobalFilters(new JwtErrorFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.use(compression());
  await app.listen( process.env.PORT||3000);



}
bootstrap();
