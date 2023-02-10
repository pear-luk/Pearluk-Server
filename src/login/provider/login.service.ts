import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Payload } from './../../auth/dto/payload.dto';
import { AuthService } from './../../auth/provider/auth.service';
import { OauthService } from './../../auth/provider/oauth.service';
import { UserRopository } from '../../user/provider/user.repository';
import { LoginInputDTO } from './../dto/login.dto';
import { ISocialLoginDTO } from './../interface/login.interface';
import { SignupService } from './signup.service';

@Injectable()
export class LoginService {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
    private readonly oauthService: OauthService,
    private readonly uesrRepo: UserRopository,
    private readonly signupService: SignupService,
  ) {}

  async login(loginInputDTO: LoginInputDTO): Promise<Payload> {
    const { social_type } = loginInputDTO;
    const result = await this[social_type + 'Login'](loginInputDTO);

    return result;
  }

  async localLogin() {}

  async kakaoLogin(socialLoginDTO: ISocialLoginDTO): Promise<Payload> {
    const { social_code, social_type } = socialLoginDTO;
    const { access_token: social_token } =
      await this.oauthService.getKaKaoToken(social_code);

    const {
      email,
      social_id,
      nickname: kakaoNickName,
    } = await this.oauthService.getUserInfokakao(social_token);
    const exist = await this.uesrRepo.uniqueEmail(email);
    const { user_id, nickname } = exist ?? {};

    try {
      //1. 유저가 존재하지않을때
      if (!exist) {
        return await this.signupService.kakaoSignup({
          email,
          social_type,
          social_id,
          nickname: kakaoNickName,
        });
      }

      //2. 유저가 존재할때
      const socailInfoExist = exist
        ? await this.uesrRepo.uniqueSocialInfo({
            user_id,
            social_id,
          })
        : null;

      //3. 유저가 존재하나 소셜정보가 없을때.
      !socailInfoExist
        ? await this.uesrRepo.addSocialInfo({
            user_id,
            social_type,
            social_id,
          })
        : null;
    } catch (err) {
      throw new HttpException(err.message, 400);
    }

    const payload = { user_id, nickname, social_type };

    return payload;
  }
}
