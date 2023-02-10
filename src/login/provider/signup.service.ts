import { HttpException, Injectable } from '@nestjs/common';
import { IPayload } from '../../auth/interface/jwt.interface';
import { OauthService } from '../../auth/provider/oauth.service';
import { SignupInputDTO } from '../dto/signup.dto';
import { UserRopository } from '../../user/provider/user.repository';
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
    const { email, social_type, social_id, nickname } = signupDTO;

    try {
      // false ?? 실행
      // true ??
      const user = await this.uesrRepo.socialSignup({
        social_type,
        email,
        social_id,
        nickname,
      });

      const payload = { ...user, social_type };
      return payload;
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }
}
