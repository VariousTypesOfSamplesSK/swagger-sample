// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('BFF Sample API')
    .setDescription('The BFF API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swaggerDocument', app, document);

  // バリデーションを有効化
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTOに定義されていないプロパティを除去
      forbidNonWhitelisted: true, // 未定義プロパティがあるとエラー
      transform: true, // DTOの型へ変換（Queryパラメータ含む）
    }),
  );

  await app.listen(3000);
}
void bootstrap();
