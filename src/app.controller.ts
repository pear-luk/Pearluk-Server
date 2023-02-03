import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from './common/decorator/current-user.decorator';
import { BaseResponse } from './common/util/res/BaseResponse';
import { baseResponeStatus } from './common/util/res/baseStatusResponse';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(@CurrentUser() user): BaseResponse<string> {
    const result = this.appService.getHello();
    console.log(user);
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
