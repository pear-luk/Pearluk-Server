import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OauthService } from './oauth.setvice';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,
    @Inject(OauthService)
    private readonly oauth: OauthService,
  ) {}

  async accessTokenSign() {}
  async refreshTokenSign() {}
  async accessTokenVerify() {}
  async refreshTokenVerify() {}
}
