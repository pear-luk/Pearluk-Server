import * as Prisma from '@prisma/client';
export interface ILocalSignupDTO {
  social_type: 'local';
  name: string;
  email: string;
  password: string;
}
export interface ISocialSignupDTO {
  social_type: Prisma.SocialType;
  social_token: string;
}
