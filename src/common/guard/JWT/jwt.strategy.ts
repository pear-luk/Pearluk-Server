import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { baseResponeStatus } from '../../util/res/baseStatusResponse';
import { AuthService } from './../../../auth/provider/auth.service';
import { UserRopository } from './../../../user/provider/user.ropository';

import { JwtPayload } from './jtw.payload';
@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'JWT-ACCESS-TOKEN',
) {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepo: UserRopository,
    private readonly configService: ConfigService,
  ) {
    super({
      // jwtFromRequest: ExtractJwt.fromExtractors([jwtExtractorFromCookies]),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payLoad: JwtPayload) {
    console.log(payLoad);
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
