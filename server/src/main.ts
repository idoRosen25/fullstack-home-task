import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppDataSource, dataManager } from './data-source';
import { HttpLoggerInterceptor } from './logging/interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: '*', exposedHeaders: '*' },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new HttpLoggerInterceptor());
  AppDataSource.initialize().then(() => {
    console.log('Database connected');

    // check if any records exist locally.
    // if not, set id to start from 1000 to avoid duplication with JP
    dataManager.query('SELECT MAX(id) from post_entity').then((res) => {
      if (!res[0].max) {
        dataManager.query("SELECT setval('post_entity_id_seq',999)");
      }
    });
  });
  await app.listen(3000);
}
bootstrap();
