import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // decorator 없는 property 거름
      forbidNonWhitelisted: true, // 허용되지 않은 property 요청을 막음
      transform: true, // request parameter를 원하는 실제 타입으로 변환
    }),
  );
  await app.listen(3000);
}
bootstrap();
