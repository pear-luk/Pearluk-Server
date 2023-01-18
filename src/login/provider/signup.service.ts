import { Injectable } from '@nestjs/common';
import { SignupInputDTO } from './../../auth/dto/signup.dto';
import { OauthService } from './../../auth/provider/oauth.setvice';
import {
  ILocalSignupDTO,
  ISocialSignupDTO,
} from './../interface/signup.interface';

@Injectable()
export class SignupService {
  constructor(private readonly oauthService: OauthService) {}
  async signup(signupDTO: SignupInputDTO) {
    const { social_type } = signupDTO;
    const result = await this[social_type + 'Signup'](signupDTO);

    return result;
  }
  async localSignup(localSignupDTO: ILocalSignupDTO) {
    const { social_type, name, email, password } = localSignupDTO;
  }

  async kakaoSignup(signupDTO: ISocialSignupDTO) {
    const { social_token, social_type } = signupDTO;
    const {} = await this.oauthService.getUserInfokakao(social_token);
  }
}
