import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/common/guard/adminGuard';
import { JwtAccessAuthGuard } from 'src/common/guard/JWT/jwt.guard';
import { AnswerService } from './provider/answer.service';

@ApiTags('Answer API')
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: '아카이브 생성 API',
    description: `
      아카이브 생성 API입니다.
      관리자만 접근이 가능합니다.

      필요한 정보
      - title : 아카이브 이름 String
      - year : 아카이브 해당 년도 Int
      - introduce ?: 아카이브 소개 String 
    `,
  })
  @Post('/')
  @UseGuards(JwtAccessAuthGuard, AdminAuthGuard)
  async createAnswer(@Body() answerInputDTO: AnswerCreateInputDTO) {}
}
