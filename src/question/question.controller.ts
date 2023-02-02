import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/common/guard/adminGuard';
import { JwtAccessAuthGuard } from 'src/common/guard/JWT/jwt.guard';
import { BaseResponse } from './../common/util/res/BaseResponse';
import { baseResponeStatus } from './../common/util/res/baseStatusResponse';
import {
  QuestionCreateInputDTO,
  questionCreateInputEX,
} from './dto/create_question.dto';
import { QuestionService } from './provider/question.service';

@ApiTags('Question API')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: '질문 생성 API',
    description: `
      질문 생성 API입니다.

      필요한 정보
      - type: 질문 유형
      - product_id: 상품 - String ULID
    `,
  })
  @ApiBody({
    schema: { $ref: getSchemaPath(QuestionCreateInputDTO) },
    examples: {
      PRODUCT: {
        description: `상품생성 예시`,
        value: questionCreateInputEX,
      },
    },
  })
  //ApiResponseDTO
  @Post('/')
  @UseGuards(JwtAccessAuthGuard, AdminAuthGuard)
  async createQuestion(@Body() questionInputDTO: QuestionCreateInputDTO) {
    const result = await this.questionService.createQuestion(
      QuestionCreateInputDTO,
    );

    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
