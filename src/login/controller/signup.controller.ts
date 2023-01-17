import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginService } from '../provider/login.service';

@Controller('/signup')
@ApiTags('Signup API')
export class SignupController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/')
  async signup() {}
}
