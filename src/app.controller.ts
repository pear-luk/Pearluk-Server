import { Controller, Get } from '@nestjs/common';
import { BaseResponse } from './common/util/BaseResponse';
import { baseResponeStatus } from './common/util/baseStatusResponse';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): BaseResponse<string> {
    const result = this.appService.getHello();

    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
