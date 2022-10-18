import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Cars API')
    .setDescription('API')
    .setVersion('1.0')
    .addTag('Cars Api')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api/docs', app, swaggerDocument);
  console.log(process.env.PORT);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
