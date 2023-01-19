import { Prisma, SocialType } from '@prisma/client';

export class CreateSocailUserDTO
  implements
    Omit<Prisma.UserCreateInput, 'user_id'>,
    Prisma.UserSocialInfoCreateWithoutUserInput
{
  email: string;
  nickname: string;
  social_id: string;
  social_type: SocialType;
}
