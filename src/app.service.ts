import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject(Logger)
    private readonly logger: LoggerService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
}
