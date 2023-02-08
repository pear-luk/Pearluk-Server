import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { SocialType } from '../../login/interface/socialType';
import { IPayload } from './../interface/jwt.interface';
export class Payload implements IPayload {
  @ApiProperty({ description: '소셜 타입' })
  social_type: SocialType;
  @ApiProperty({ description: '유저 닉네임 타입' })
  nickname: string;
  @ApiProperty({ description: '유저 id' })
  user_id: string;
}
