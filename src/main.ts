import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Cars API for BEU.app')
    .setDescription('API for BEU.app')
    .setVersion('1.0')
    .addTag('Cars Api')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api/docs', app, swaggerDocument);

  await app.listen(3000);
}
bootstrap();
