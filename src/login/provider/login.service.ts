import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from './../../auth/provider/auth.service';

@Injectable()
export class LoginService {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  async login() {}

  async localLogin() {}

  async kakaoLogin() {}
}
