import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import { winstonDailyOption } from './../options/winstonDaily.option';

const env = process.env.NODE_ENV;

export const winstonLogger = WinstonModule.createLogger({
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
              }),
            ),
    }),

    new winstonDaily(winstonDailyOption('info')),
    new winstonDaily(winstonDailyOption('warn')),
    new winstonDaily(winstonDailyOption('error')),
  ],
});
