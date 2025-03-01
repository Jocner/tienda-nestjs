import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

// const PORT = process.env.PORT_API || 3000
// const port = 3000
const PORT = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  app.enableCors({
    origin: 'https://api-nestjs-465543638299.us-central1.run.app',
    methods: 'GET,PUT,POST,DELETE',
    // allowedHeaders: 'Content-Type,Authorization',
  });
  app.useStaticAssets(join(__dirname, '../public'))
  
  await app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}
bootstrap();
