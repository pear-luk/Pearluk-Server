import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Payload } from './../../auth/dto/payload.dto';
import { AuthService } from './../../auth/provider/auth.service';
import { OauthService } from './../../auth/provider/oauth.service';
import { baseResponeStatus } from './../../common/util/res/baseStatusResponse';
import { UserRopository } from './../../user/provider/user.ropository';
import { LoginInputDTO } from './../dto/login.dto';
import { ISocialLoginDTO } from './../interface/login.interface';

@Injectable()
export class LoginService {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
    private readonly oauthService: OauthService,
    private readonly uesrRepo: UserRopository,
  ) {}

  async login(loginInputDTO: LoginInputDTO): Promise<Payload> {
    const { social_type } = loginInputDTO;
    const result = await this[social_type + 'Login'](loginInputDTO);

    return result;
  }

  async localLogin() {}

  async kakaoLogin(socialLoginDTO: ISocialLoginDTO): Promise<Payload> {
    const { social_token, social_type } = socialLoginDTO;
    const { email, social_id } = await this.oauthService.getUserInfokakao(
      social_token,
    );
    const exist = await this.uesrRepo.uniqueEmail(email);
    const { user_id, nickname } = exist ?? {};
    if (!exist) {
      throw new BadRequestException(baseResponeStatus.USER_NOT_EXIST);
    }
    const socailInfoExist = exist
      ? await this.uesrRepo.uniqueSocialInfo({
          user_id,
          social_id,
        })
      : null;

    const newSocialInfo = !socailInfoExist
      ? await this.uesrRepo.addSocialInfo({
          user_id,
          social_type,
          social_id,
        })
      : null;

    const payload = { user_id, nickname, social_type };

    return payload;
  }
}
