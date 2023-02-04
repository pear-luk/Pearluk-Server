import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BaseResponse } from 'src/common/util/res/BaseResponse';
import { LoginService } from '../provider/login.service';
import { AuthService } from './../../auth/provider/auth.service';
import { baseResponeStatus } from './../../common/util/res/baseStatusResponse';
import { LoginInputDTO } from './../dto/login.dto';

@Controller('/login')
@ApiTags('Login API')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async login(
    @Body() loginInputDTO: LoginInputDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const payload = await this.loginService.login(loginInputDTO);
  
    const access_token = await this.authService.accessTokenSign(payload);

    response.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false,
    });

    return new BaseResponse(baseResponeStatus.SUCCESS, payload);
  }
}
