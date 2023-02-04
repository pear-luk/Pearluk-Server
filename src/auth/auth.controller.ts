import { Controller, Get, UseGuards } from '@nestjs/common';
import { BaseResponse } from 'src/common/util/res/BaseResponse';
import { CurrentUser } from '../common/decorator/current-user.decorator';
import { JwtAccessAuthGuard } from '../common/guard/JWT/jwt.guard';
import { baseResponeStatus } from './../common/util/res/baseStatusResponse';
import { Payload } from './dto/payload.dto';

@Controller('/auth')
export class AuthController {
  //로그인 상태 리턴.
  @Get('/')
  @UseGuards(JwtAccessAuthGuard)
  async getLoginStatus(@CurrentUser() user: Payload) {
    console.log(user);

    return new BaseResponse(baseResponeStatus.SUCCESS, user);
  }
}
