import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  //제일 큰 root 모듈이 AppModule
  const app = await NestFactory.create(AppModule);
  await app.listen(3000); // 3000번 포트에서 이 nestjs 어플리케이션을 실행하는 것을 의미
}
bootstrap();
