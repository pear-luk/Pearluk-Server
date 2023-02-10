import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
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
import { DevGuard } from '../common/guard/devGuard';
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
  @UseGuards(DevGuard)
  async getQuestionList() {
    const result = '성공';
    return result;
  }

  @Post('/qa') //질문하기
  @UseGuards(DevGuard)
  async createQuestion(@Body() questionInputDTO: QuestionCreateInputDTO) {
    const result = await this.questionService.createQuestion(questionInputDTO);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Patch('/:question_id')
  @UseGuards(DevGuard)
  async updateQuestion(
    @Param('question_id') question_id: string,
    @Body() QuestionUpdateInputDTO: QuestionUpdateInputDTO,
  ) {
    const result = await this.questionService.updateQuestion({
      question_id,
      ...QuestionUpdateInputDTO,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  // @Get()
  // @UseGuards(DevGuard)
  // async getQA() {
  //   return 'getQA!';
  // }
}
