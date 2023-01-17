import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

import { winstonLogger } from './common/util/winston.util';
import { Application } from './server';
async function init(): Promise<void> {
  const server = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: winstonLogger,
  });
  const app = new Application(server);
  try {
    await app.boostrap();
    app.startLog();
  } catch (err) {
    app.errorLog(err);
  }
}

init();
