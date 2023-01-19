import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { IPayload } from '../../auth/interface/jwt.interface';
import { OauthService } from '../../auth/provider/oauth.service';
import { baseResponeStatus } from '../../common/util/res/baseStatusResponse';
import { SignupInputDTO } from '../dto/signup.dto';
import { UserRopository } from './../../user/provider/user.ropository';
import {
  ILocalSignupDTO,
  ISocialSignupDTO,
} from './../interface/signup.interface';

@Injectable()
export class SignupService {
  constructor(
    private readonly oauthService: OauthService,

    private readonly uesrRepo: UserRopository,
  ) {}
  async signup(signupDTO: SignupInputDTO): Promise<IPayload> {
    const { social_type } = signupDTO;
    const result = await this[social_type + 'Signup'](signupDTO);

    return result;
  }

  async localSignup(localSignupDTO: ILocalSignupDTO) {
    const { social_type, name, email, password } = localSignupDTO;
  }

  async kakaoSignup(signupDTO: ISocialSignupDTO) {
    const { social_token, social_type } = signupDTO;
    const { email, social_id, nickname } =
      await this.oauthService.getUserInfokakao(social_token);

    const exist = await this.uesrRepo.uniqueEmail(email);
    const { user_id } = exist ?? {};

    const socailInfoExist = exist
      ? await this.uesrRepo.uniqueSocialInfo({
          user_id,
          social_id,
        })
      : null;
    if (socailInfoExist) {
      throw new BadRequestException(baseResponeStatus.USER_EXIST);
    }
    try {
      // false ?? 실행
      // true ??
      const user = !exist
        ? await this.uesrRepo.socialSignup({
            social_type,
            email,
            social_id,
            nickname,
          })
        : await this.uesrRepo.addSocialInfo({
            user_id,
            social_type,
            social_id,
          });

      const payload = { ...user, social_type };
      return payload;
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }
}
