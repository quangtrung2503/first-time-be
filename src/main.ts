import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './common/configuration';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.listen(3000);
  const config = new DocumentBuilder()
    .setTitle('CPIE API')
    .setDescription('The CPIE API documents. Account: admin/123456')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(configuration().port);
}
bootstrap();
