import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BaseResponse } from './common/util/res/BaseResponse';
import { baseResponeStatus } from './common/util/res/baseStatusResponse';

import { AppService } from './app.service';
import { CurrentUser } from './common/decorator/current-user.decorator';
import { DevGuard } from './common/guard/devGuard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/')
  @UseGuards(DevGuard)
  getHello(@Body() body, @CurrentUser() user): BaseResponse<string> {
    const result = this.appService.getHello();
    console.log(user);
    // throw new HttpExeption('Forbidden', HttpStatus.FORBIDDEN);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
