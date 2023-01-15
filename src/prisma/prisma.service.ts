import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({ log: [{ emit: 'stdout', level: 'query' }], errorFormat: 'pretty' });
  }

  async onModuleInit() {
    await this.$connect();

    // 미들웨어
    this.$use(async (params, next) => {
      console.log(params);

      const result = await next(params);
      return result;
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
