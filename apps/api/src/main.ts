import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as compression from 'compression';
import * as cookieparser from 'cookie-parser';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

import { AppModule } from './app/app.module';
import { QueryParserInterceptor } from './app/shared/query-parser/query-parser.interceptor';
import { TransformInterceptor } from './app/shared/transform/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set app interceptors and stuff
  app.use(compression());
  app.use(helmet());
  app.use(cookieparser());
  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      max: 1000
    })
  );
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(
    new ValidationPipe({
      validationError: { target: true, value: true },
      transform: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      whitelist: true
    })
  );
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector))
  );

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const options = new DocumentBuilder()
    .setTitle('Rob Bailey API')
    .addBearerAuth()
    .setDescription('A description of the API powering robbailey3.co.uk')
    .setVersion('1.0.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/help', app, document);

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/${globalPrefix}`);
  });
}

bootstrap();
