import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

import { winstonLogger } from './common/util/winston.util';
import { Application } from './server';
/**
 * bigint serialize error 해결.
 */
declare global {
  interface BigInt {
    toJSON(): string;
  }
}
/**
 * DB에서 꺼내올때 string으로 꺼내오는 문제생김.
 */
// BigInt.prototype.toJSON = function (): string {
//   return this.toString();
// };

/**
 * DB에서 꺼내올때 number로 한번 전환해줌.
 */
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};
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
