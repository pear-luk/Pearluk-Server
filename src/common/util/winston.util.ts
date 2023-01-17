import { WinstonModule } from 'nest-winston';
import { winstonOption } from './../options/winston.option';

export const winstonLogger = WinstonModule.createLogger(winstonOption);
