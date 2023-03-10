import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { baseResponeStatus } from '../../util/res/baseStatusResponse';
import { AuthService } from './../../../auth/provider/auth.service';
import { UserRepository } from '../../../user/provider/user.repository';

import { JwtPayload } from './jtw.payload';
import { jwtExtractorFromCookies } from './jwtExtractorFromCookeis';
@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'JWT-ACCESS-TOKEN',
) {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepo: UserRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      // jwtFromRequest: ExtractJwt.fromExtractors([jwtExtractorFromCookies]),

      jwtFromRequest: ExtractJwt.fromExtractors([jwtExtractorFromCookies]),
      secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payLoad: JwtPayload) {
    const { user_id } = payLoad;
    const user = await this.userRepo.checkUserJWT({ user_id });

    if (user) {
      return user;
    } else {
      throw new UnauthorizedException(
        baseResponeStatus.AUTH_ACCESS_TOKEN_FAILURE,
      );
    }
  }
}
