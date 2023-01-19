import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { baseResponeStatus } from '../../common/util/baseStatusResponse';

Injectable();
export class OauthService {
  constructor(
    @Inject(HttpService)
    private readonly httpService: HttpService,
  ) {}

  async getUserInfokakao(social_token: string): Promise<{
    email: string;
    social_id: string;
    nickname: string;
  }> {
    try {
      const kakaoResponse = await this.httpService.axiosRef.post(
        'https://kapi.kakao.com/v2/user/me',
        {
          property_keys: ['kakao_account.email'],
        },
        {
          headers: {
            Authorization: `Bearer ${social_token}`,
          },
        },
      );
      const nickname = kakaoResponse.data.kakao_account.profile.nickname;
      const kakao_id = kakaoResponse.data.id;
      const email = kakaoResponse.data.kakao_account.email;

      if (!email) {
        throw new UnauthorizedException(baseResponeStatus.OAUTH_TOKEN_FAILURE);
      }
      if (!nickname) {
        throw new UnauthorizedException(baseResponeStatus.OAUTH_TOKEN_FAILURE);
      }
      return { email, social_id: String(kakao_id), nickname };
    } catch (e) {
      throw new UnauthorizedException(baseResponeStatus.OAUTH_TOKEN_FAILURE);
    }
  }
}
