import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import authConfig from '../../config/authConfig';
import { IPayload, IToken } from '../interface/jwt.interface';

import { OauthService } from './oauth.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,
    @Inject(OauthService)
    private readonly oauth: OauthService,
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
  ) {}

  async accessTokenSign(payload: IPayload) {
    const access_token = await this.jwtService.signAsync(payload, {
      secret: this.config.accessTokenPrivateKey,
      expiresIn: this.config.accessTokenExpiresIn,
      // expiresIn: 1,
    });

    return access_token;
  }

  async refreshTokenSign(payload: IPayload) {
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.config.refreshTokenPrivateKey,
      expiresIn: this.config.refreshTokenExpiresIn,
      // expiresIn: '1s',
    });
    return refresh_token;
  }

  async accessTokenVerify({ access_token }: IToken) {
    const verify = this.jwtService.verify(access_token, {
      secret: this.config.accessTokenPrivateKey,
    });
    return verify;
  }

  async refreshTokenVerify({ refresh_token }: IToken) {
    const verify = this.jwtService.verify(refresh_token, {
      secret: this.config.refreshTokenPrivateKey,
    });

    return verify;
  }
}
