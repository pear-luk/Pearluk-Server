import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { baseResponeStatus } from '../../common/util/res/baseStatusResponse';

Injectable();
export class OauthService {
  constructor(
    @Inject(HttpService)
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  async getKaKaoToken(social_code) {
    const KAKAO_REST_API_KEY = this.configService.get('KAKAO_REST_API_KEY');
    const KAKAO_REDIRECT_URI = this.configService.get('KAKAO_REDIRECT_URI');
    try {
      const { data } = await this.httpService.axiosRef.get(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${social_code}`,
      );

      return data;
    } catch (e) {
      throw new UnauthorizedException(baseResponeStatus.OAUTH_TOKEN_FAILURE);
    }
  }

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
