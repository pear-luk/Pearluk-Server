import * as Prisma from '@prisma/client';
export interface ILocalLoginDTO {
  social_type: 'local';
  email: string;
  password: string;
}
export interface ISocialLoginDTO {
  social_type: Prisma.SocialType;
  social_token: string;
}
