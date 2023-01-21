import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SocialType as prismaSocialType } from '@prisma/client';
import { BaseResponse } from '../../common/util/res/BaseResponse';
import { baseResponeStatus } from '../../common/util/res/baseStatusResponse';
import { SignupInputDTO } from '../dto/signup.dto';
import { AuthService } from './../../auth/provider/auth.service';
import { signupResonseEX, SignupResponseDTO } from './../dto/signup.dto';
import { SignupService } from './../provider/signup.service';

@Controller('/signup')
@ApiTags('Signup API')
@ApiExtraModels(BaseResponse, SignupInputDTO, SignupResponseDTO)
export class SignupController {
  constructor(
    private readonly signupService: SignupService,
    private readonly authService: AuthService,
  ) {}

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
  @ApiResponse({
    status: 201,
    description: 'SUCCESS',
    schema: {
      example: new BaseResponse(baseResponeStatus.SUCCESS, signupResonseEX),
    },
  })
  @ApiBadRequestResponse({
    description: '이미 존재하는 유저',
    schema: {
      example: baseResponeStatus.USER_EXIST,
    },
  })
  @ApiUnauthorizedResponse({
    description: '소셜 token 인증 실패',
    schema: {
      example: baseResponeStatus.OAUTH_TOKEN_FAILURE,
    },
  })
  @Post('/')
  async signup(@Body() body: SignupInputDTO) {
    const payload = await this.signupService.signup(body);
    const access_token = await this.authService.accessTokenSign(payload);
    const result = { access_token, user: payload };
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
