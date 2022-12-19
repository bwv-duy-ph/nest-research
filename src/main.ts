import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setUp } from './app.service';

async function startApplication(): Promise<void> {
  // Create the Nest application
  const nestApplication = await NestFactory.create(AppModule, { cors: true });

  // Enable global validation pipes
  nestApplication.useGlobalPipes(new ValidationPipe());

  // Set up Swagger and start the application
  setUp(nestApplication);
}

startApplication();
