import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ulid } from 'ulid';
import { PrismaService } from './../../prisma/prisma.service';
import { CreateSocailUserDTO } from './../dto/create_user.dto';
@Injectable()
export class UserRopository {
  constructor(private readonly prisma: PrismaService) {}

  async socialSignup(socialSignup: CreateSocailUserDTO) {
    const { email, nickname, social_id, social_type } = socialSignup;

    const user_id = ulid();
    const newUser = await this.prisma.user.create({
      select: { user_id: true, nickname: true },
      data: {
        user_id,
        email,
        nickname,
        userSocialInfos: {
          create: {
            social_type,
            social_id,
          },
        },
      },
    });
    return newUser;
  }

  async uniqueEmail(email: string) {
    const exist = await this.prisma.user.findUnique({
      select: { user_id: true },
      where: { email },
    });
    return exist;
  }

  async uniqueSocialInfo({
    user_id,
    social_id,
  }: Prisma.UserSocialInfoUser_idSocial_idCompoundUniqueInput) {
    const socailInfo = await this.prisma.userSocialInfo.findUnique({
      select: { user_id: true, social_type: true },
      where: {
        user_id_social_id: { user_id, social_id },
      },
    });
    return socailInfo;
  }

  async addSocialInfo({
    user_id,
    social_type,
    social_id,
  }: Prisma.UserSocialInfoUncheckedCreateInput) {
    const socailInfo = await this.prisma.userSocialInfo.create({
      select: {
        user: {
          select: {
            user_id: true,
            nickname: true,
          },
        },
      },
      data: { user_id, social_type, social_id },
    });
    return { ...socailInfo.user };
  }
}
