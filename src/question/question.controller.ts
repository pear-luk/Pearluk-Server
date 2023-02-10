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
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('/qa') //질문리스트 조회
  async getQuestionList() {
    const result = '성공';
    return result;
  }

  @Post('/qa') //질문하기
  async createQuestion(@Body() questionInputDTO: QuestionCreateInputDTO) {
    const result = await this.questionService.createQuestion(questionInputDTO);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Get()
  async getQA() {
    return 'getQA!';
  }
}
