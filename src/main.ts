/* eslint-disable prettier/prettier */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { BusinessErrorsInterceptor } from './shared/interceptors/business-errors.interceptor';
async function bootstrap() {
 const app = await NestFactory.create(AppModule);
 
 await app.listen(3000);
 app.useGlobalPipes(new ValidationPipe());
 app.useGlobalInterceptors(new BusinessErrorsInterceptor());
}
bootstrap();