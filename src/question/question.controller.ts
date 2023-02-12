import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { DevGuard } from '../common/guard/devGuard';
import { BaseResponse } from './../common/util/res/BaseResponse';
import { baseResponeStatus } from './../common/util/res/baseStatusResponse';
import { QuestionCreateInputDTO } from './dto/create_question.dto';
import { QuestionUpdateInputDTO } from './dto/update_question.dto';
import { QuestionService } from './provider/question.service';

@ApiExtraModels(QuestionCreateInputDTO, QuestionUpdateInputDTO)
@ApiTags('Question API')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  // @Get('/') //질문리스트 조회
  // @UseGuards(DevGuard)
  // async getQuestionList() {
  //   const result = '성공';
  //   return result;
  // }

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

  @Post('/:question_id') //비밀글 조회
  @UseGuards(DevGuard)
  async secretQuestion(
    @Param('question_id') question_id: string,
    @Body() password: string,
  ) {
    const result = await this.questionService.getSecretQuestion(
      { question_id },
      password,
    );
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Patch('/:question_id') //질문 수정
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

  @Put('/:question_id') //질문 삭제
  @UseGuards(DevGuard)
  async deleteStatusQuestion(@Param('question_id') question_id: string) {
    const result = await this.questionService.deleteStatusQuestion({
      question_id,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
