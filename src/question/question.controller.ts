import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { E_status } from '@prisma/client';
import { ApiResponseDTO } from '../common/decorator/ApiResponse';
import { DevGuard } from '../common/guard/devGuard';
import { BaseResponse } from './../common/util/res/BaseResponse';
import { baseResponeStatus } from './../common/util/res/baseStatusResponse';
import {
  QuestionCreateInputDTO,
  questionCreateInputEX,
  questionCreateResponseEX,
} from './dto/create_question.dto';
import { QuestionSecretInputDTO } from './dto/secret_question.dto';
import { QuestionUpdateInputDTO } from './dto/update_question.dto';
import { QuestionFaker } from './provider/question.faker';
import { QuestionService } from './provider/question.service';
@ApiExtraModels(QuestionCreateInputDTO, QuestionUpdateInputDTO)
@ApiTags('Question API')
@Controller('questions')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly questionFaker: QuestionFaker,
  ) {}

  @ApiOperation({
    summary: '질문 생성 API',
    description: `
  질문 생성 API입니다

  필요한정보.
  - title: 질문 제목 - String
  - contents: 질문 내용 - String
  - user_id: 유저 아이디 - String
  - type ?: 질문 유형 - Number (E_QuestionType)
    0. 배송관련 질문
    1. 상품 관련 질문. 
  - secret_mode ?: 질문 비공개 유무 - Number
  - password ?: 비공개 질문 열람시 필요 비밀번호 - String
  - product_id ?: 상품 아이디 - String
  `,
  })
  @ApiBody({
    schema: { $ref: getSchemaPath(QuestionCreateInputDTO) },
    examples: {
      CREATE_QUESTION: {
        description: '질문 생성 예시',
        value: questionCreateInputEX,
      },
    },
  })
  @ApiResponseDTO(
    200,
    new BaseResponse(baseResponeStatus.SUCCESS, questionCreateResponseEX),
    '성공',
  )
  @ApiResponseDTO(
    400.4,
    baseResponeStatus.PASSWORD_NEEDED,
    '비밀번호가 필요할때',
  )
  @ApiResponseDTO(
    400.3,
    baseResponeStatus.PASSWORD_NOT_NEEDED,
    '비밀번호가 필요하지 않을때',
  )
  @ApiResponseDTO(
    400.2,
    baseResponeStatus.USER_NOT_EXIST,
    '유저가 존재하지 않을때',
  )
  @ApiResponseDTO(
    400.1,
    baseResponeStatus.PRODUCT_NOT_EXIST,
    '상품이 존재하지 않을때',
  )
  @Post('/') //질문 생성
  @UseGuards(DevGuard)
  async createQuestion(@Body() questionInputDTO: QuestionCreateInputDTO) {
    const result = await this.questionService.createQuestion(questionInputDTO);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Get('/:question_id') //질문 한개 조회
  @UseGuards(DevGuard)
  async getQuestion(@Param('question_id') question_id: string) {
    const result = await this.questionService.getQuestion({
      question_id,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Get('/') //질문 조회
  @UseGuards(DevGuard)
  async getQuestionList(
    @Query()
    query: {
      product?: string; // 상품관련 질문 조회를 할때
      user?: string; // 이건 빼는게 날수도. API를 하나 더만들어서 토큰기반으로 가져오는게 더 날거같음.
      type?: string; // type 1 = 상품 관련 0 = qa 페이지 관련.
      page?: string;
    },
  ) {
    const result = await this.questionService.getQuestionList(query);
    console.log(result);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Post('/:question_id') //비밀글 조회
  @UseGuards(DevGuard)
  async secretQuestion(
    @Param('question_id') question_id: string,
    @Body() questionSecretInputDTO: QuestionSecretInputDTO,
  ) {
    const result = await this.questionService.getSecretQuestion({
      question_id,
      ...questionSecretInputDTO,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Patch('/:question_id') //질문 수정
  @UseGuards(DevGuard)
  async updateQuestion(
    @Param('question_id') question_id: string,
    @Body() questionUpdateInputDTO: QuestionUpdateInputDTO,
  ) {
    const result = await this.questionService.updateQuestion({
      question_id,
      ...questionUpdateInputDTO,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @ApiOperation({
    summary: '질문 삭제 API',
    description: `
    질문 삭제 API입니다

    params
    - question_id: 질문 id - String ULID
    `,
  })
  @ApiParam({
    name: 'question_id',
    type: 'string',
    example: questionCreateResponseEX.question_id,
  })
  @ApiResponseDTO(
    200,
    new BaseResponse(baseResponeStatus.SUCCESS, {
      ...questionCreateResponseEX,
      status: E_status.DELETED,
    }),
    '성공',
  )
  @ApiResponseDTO(
    400.1,
    baseResponeStatus.QUESTION_NOT_EXIST,
    '질문이 존재하지 않을때',
  )
  @Put('/:question_id') //질문 삭제
  @UseGuards(DevGuard)
  async deleteStatusQuestion(@Param('question_id') question_id: string) {
    const result = await this.questionService.deleteStatusQuestion({
      question_id,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Post('/faker/post')
  @UseGuards(DevGuard)
  async fakerData() {
    const result = await this.questionFaker.createQuestion();
    return result;
  }
}
