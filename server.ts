import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import next from 'next';
import { config } from 'dotenv';
import { AppModule } from './server/app.module';
const nextApp = next({
  dev: process.env.NODE_ENV !== 'production',
  dir: './client',
});
const handle = nextApp.getRequestHandler();

async function bootstrap() {
  config();
  const port = Number(process.env.PORT) || 3000;
  //prepare next
  await nextApp.prepare();
  //prepare nest
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const nestServer = app.getHttpAdapter();
  nestServer.use(express.static('public'));
  app.setGlobalPrefix('api');
  nestServer.all(
    '*',
    (req: IncomingMessage, res: ServerResponse<IncomingMessage>, next) => {
      if (req.url.startsWith('/api')) {
        next();
      } else {
        return handle(req, res);
      }
    },
  );
  await app
    .listen(port, () => {
      console.log(`\x1B[96m[Next on Nest] Listening on port ${port}\x1B[39m`);
    })
    .catch((e) => console.error('server launch failed', e));
}

bootstrap();
