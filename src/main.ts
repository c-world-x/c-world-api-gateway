import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const PORT = configService.get<number>('PORT');

  await app.listen(PORT, async () => {
    console.log(`Server started listening: ${PORT}`);
  });
}
bootstrap().then(() => {});
