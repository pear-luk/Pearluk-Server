import { SocialType } from './socialType';
export interface IPayload {
  social_type: SocialType;
  nickname: string;
  user_id: string;
}

export interface IToken {
  access_token?: string;
  refresh_token?: string;
}
