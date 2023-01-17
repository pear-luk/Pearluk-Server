import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { utilities, WinstonModule } from 'nest-winston';
import { PrismaModule } from 'src/prisma/prisma.module';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configOption } from './common/options/config.option';
import { winstonDailyOption } from './common/options/winstonDaily.option';

const env = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot(configOption),
    PrismaModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: env === 'production' ? 'http' : 'silly',
          format:
            env === 'production'
              ? winston.format.simple()
              : winston.format.combine(
                  winston.format.timestamp(),
                  utilities.format.nestLike('pearluk', {
                    prettyPrint: true,
                    colors: true,
                  }),
                ),
        }),
        new winstonDaily(winstonDailyOption('info')),
        new winstonDaily(winstonDailyOption('warn')),
        new winstonDaily(winstonDailyOption('error')),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
