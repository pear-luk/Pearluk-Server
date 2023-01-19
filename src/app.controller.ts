import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { BaseResponse } from './common/util/res/BaseResponse';
import { baseResponeStatus } from './common/util/res/baseStatusResponse';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): BaseResponse<string> {
    const result = this.appService.getHello();
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
