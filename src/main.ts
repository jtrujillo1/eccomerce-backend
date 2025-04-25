import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      skipNullProperties: true,
    }),
  );

  const config = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('MS Wompi eccomerce')
    .setDescription('Microservice to process payments of products')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document);

  const port = config.get<number>('PORT') ?? 3000;

  await app.listen(port, () =>
    Logger.log(`Application is running on: port: ${port}`),
  );
}

void bootstrap();
