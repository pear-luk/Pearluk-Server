import * as Prisma from '@prisma/client';

export const SocialType: {
  local: 'local';
} & typeof Prisma.SocialType = {
  local: 'local',
  ...Prisma.SocialType,
};

export type SocialType = (typeof SocialType)[keyof typeof SocialType];
