import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
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
  questionCreateResponseEX,
} from './dto/create_question.dto';
import { QuestionUpdateInputDTO } from './dto/update_question.dto';
import { QuestionService } from './provider/question.service';

@ApiExtraModels(QuestionCreateInputDTO, QuestionUpdateInputDTO)
@ApiTags('Question API')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  // @ApiBearerAuth()
  // @ApiOperation({
  //   summary: '질문 생성 API',
  //   description: `
  //     질문 생성 API입니다.

  //     필요한 정보
  //     - type: 질문 유형
  //     - product_id: 상품 - String ULID
  //   `,
  // })
  // @ApiBody({
  //   schema: { $ref: getSchemaPath(QuestionCreateInputDTO) },
  //   examples: {
  //     PRODUCT: {
  //       description: `상품생성 예시`,
  //       value: questionCreateInputEX,
  //     },
  //   },
  // })
  //ApiResponseDTO
  // @Post('/')
  // @UseGuards(JwtAccessAuthGuard, AdminAuthGuard)
  // async createQuestion(@Body() questionInputDTO: QuestionCreateInputDTO) {
  //   const result = await this.questionService.createQuestion(
  //     QuestionCreateInputDTO,
  //   );

  //   return new BaseResponse(baseResponeStatus.SUCCESS, result);
  // }

  @ApiResponse({
    status: 201,
    description: 'SUCCESS',
    schema: {
      example: new BaseResponse(
        baseResponeStatus.SUCCESS,
        questionCreateResponseEX,
      ),
    },
  })
  @ApiBadRequestResponse({
    description: '이미 존재하는 아카이브 이름',
    schema: {
      example: baseResponeStatus.QUESTION_EXIST,
    },
  })
  @Get('qa')
  @UseGuards(JwtAccessAuthGuard, AdminAuthGuard)
  async getQuestionList() {
    const result = '성공';
    return result;
  }

  @Post('qa')
  @UseGuards(JwtAccessAuthGuard, AdminAuthGuard)
  async createQuestion() {
    return 'createquestion';
  }

  @Get()
  async getQA() {
    return 'getQA!';
  }
}
