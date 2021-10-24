import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common'
// import {CookieSession} from 'cookie-session'

const cookieSession = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys:['afdfhhasfhdhsafdghfgsafdgh']
  }))
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }))
  await app.listen(3000);
}
bootstrap();
