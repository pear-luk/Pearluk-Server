import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SocialType as prismaSocialType } from '@prisma/client';
import { SignupInputDTO } from './../../auth/dto/signup.dto';
import { SignupService } from './../provider/signup.service';

@Controller('/signup')
@ApiTags('Signup API')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @ApiOperation({
    summary: '회원가입 API',
    description: ` 회원가입 API입니다

    회원가입은 크게 두가지로 구분됩니다.
    각각 필요한 정보가 다릅니다.
    1.local 회원가입 - local signup
      - social_type
      - nickname
      - email
      - password
      
    2.social 회원가입 - social signup
      - social_type
      - social_token
    `,
  })
  @ApiBody({
    schema: {
      oneOf: [
        {
          description: '소셜 회원가입',
          properties: {
            social_type: {
              type: 'string',
              enum: Object.keys(prismaSocialType),
            },
            social_token: { type: 'string' },
          },
        },
        {
          description: '로컬 회원가입',
          properties: {
            social_type: { type: 'string', enum: ['local'] },
            nickname: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
          },
        },
      ],
    },
    examples: {
      social_signup: {
        description: `소셜 회원가입 예시입니다.`,
        value: {
          social_type: 'kakao',
          social_token: 'JWT',
        },
      },
      local_signup: {
        description: `로컬 회원가입 예시입니다.`,
        value: {
          social_type: 'kakao',
          nickname: '홍길동',
          email: 'qwer1234@naver.com',
          password: 'qwer1234qewr@',
        },
      },
    },
  })
  @Post('/')
  async signup(@Body() body: SignupInputDTO) {
    const result = await this.signupService.signup(body);
  }
}
