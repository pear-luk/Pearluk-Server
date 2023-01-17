import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginService } from '../provider/login.service';

@Controller('/login')
@ApiTags('Login API')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login() {}
}
