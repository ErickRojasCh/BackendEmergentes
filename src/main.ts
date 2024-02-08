import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Obtener el puerto de la variable de entorno o usar el puerto 3000 por defecto
  const port = process.env.PORT || 3000;
  const config = new DocumentBuilder()
    .setTitle('Emergentes Backend')
    .setDescription('The API Description of Backend')
    .setVersion('1.0')
    .addBearerAuth() // Agregar soporte para autenticación JWT
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
