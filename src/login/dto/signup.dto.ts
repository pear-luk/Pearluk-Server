import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, ValidateIf } from 'class-validator';
import { SocialType } from '../../auth/interface/socialType';
import { Payload } from './../../auth/dto/payload.dto';

export class SignupInputDTO {
  @ApiProperty({
    name: 'social_type',
    description: `
      회원가입하려는 social type을 입력.
    `,
    enum: SocialType,
  })
  @IsEnum(SocialType, { message: '소셜타입 에러' })
  social_type: SocialType;

  @ApiProperty({
    name: 'social_token',
    description: `
      social_type이 local이 아닐때 입력.
      외부토큰을 입력
    `,
  })
  @ValidateIf(
    ({ social_type }) =>
      social_type !== SocialType.local && social_type in SocialType,
  )
  @IsString({ message: '소셜 토큰에러' })
  social_token?: string;

  @ApiProperty({
    name: 'nickname',
    description: `
      social_type이 local일때 입력.
    `,
  })
  @ValidateIf((o) => o.social_type === SocialType.local)
  @IsString({ message: '닉네임을 입력해주세요' })
  nickname?: string;

  @ApiProperty({
    name: 'email',
    description: `
      social_type이 local일때 입력.
    `,
  })
  @ValidateIf((o) => o.social_type === SocialType.local)
  @IsEmail({}, { message: '이메일을 입력해주세요' })
  email?: string;

  @ApiProperty({
    name: 'password',
    description: `
      social_type이 local일때 입력.
    `,
  })
  @ValidateIf((o) => o.social_type === SocialType.local)
  @IsString({ message: '패스워드를 입력해주세요' })
  password?: string;
}

export class SignupResponseDTO {
  access_token: string;

  user: Payload;
}
export const signupResonseEX = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDFHUWRUTTBLR0pWMDU1S000MEhRUUg1OVAiLCJuaWNrbmFtZSI6IuuwleykgO2YgSIsInNvY2lhbF90eXBlIjoia2FrYW8iLCJpYXQiOjE2NzQxNDQ3NTUsImV4cCI6MTY3NDE1MTk1NX0.9hkoFo-k5u0Lr_EIazjjzwGRHtoL-x7ZJpqrJpf-wKc',
  user: {
    user_id: '01GQ4TM0KGJV055KM40HQQH59P',
    nickname: '박준혁',
    social_type: 'kakao',
  },
};
