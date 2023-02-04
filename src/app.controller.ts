import { Body, Controller, Post } from '@nestjs/common';
import { BaseResponse } from './common/util/res/BaseResponse';
import { baseResponeStatus } from './common/util/res/baseStatusResponse';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/')
  getHello(@Body() body): BaseResponse<string> {
    const result = this.appService.getHello();
    console.log(body);
    // throw new HttpExeption('Forbidden', HttpStatus.FORBIDDEN);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
