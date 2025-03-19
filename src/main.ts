import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cors from 'cors';

// const PORT = process.env.PORT_API || 3000
// const port = 3000
const PORT = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.use(cors());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  // app.enableCors({
  //   origin: 'https://pear-tec.com/',
  //   methods: 'GET,PUT,POST,DELETE',
  //   // allowedHeaders: 'Content-Type,Authorization',
  // });
  app.use(cors({
    origin: '*', // Permitir solicitudes desde cualquier origen (puedes especificar los orígenes permitidos)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Método HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
  }));
  app.useStaticAssets(join(__dirname, '../public'))
  
  await app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}
bootstrap();
