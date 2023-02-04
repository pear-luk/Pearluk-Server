import { Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BaseResponse } from 'src/common/util/res/BaseResponse';
import { LoginService } from '../provider/login.service';
import { AuthService } from './../../auth/provider/auth.service';
import { baseResponeStatus } from './../../common/util/res/baseStatusResponse';

@Controller('/logout')
@ApiTags('Logout API')
export class LogoutController {
  constructor(
    private readonly loginService: LoginService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');

    return new BaseResponse(baseResponeStatus.SUCCESS);
  }
}
