import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationContext } from 'graphql';
import { applySchemaTransforms } from 'graphql-tools';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
}
bootstrap();
