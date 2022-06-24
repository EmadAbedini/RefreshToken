import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.use(helmet());

  app.enableCors({
    origin: String(configService.get('CORS_ORIGIN')),
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  // To enable `class-validator`
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  // To disable `x-powered-by` header
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  // To use `enableShutdownHooks` in `prisma.service`
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // To enable `versioning`
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Global prefix
  app.setGlobalPrefix('api');

  const port: number = configService.get('PORT');
  await app.listen(port);
}
bootstrap();
