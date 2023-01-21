import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginService } from '../provider/login.service';
import { AuthService } from './../../auth/provider/auth.service';
import { LoginInputDTO } from './../dto/login.dto';

@Controller('/login')
@ApiTags('Login API')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async login(@Body() loginInputDTO: LoginInputDTO) {
    console.log(loginInputDTO);
    const payload = await this.loginService.login(loginInputDTO);
    const access_token = await this.authService.accessTokenSign(payload);
    return { access_token };
  }
}
