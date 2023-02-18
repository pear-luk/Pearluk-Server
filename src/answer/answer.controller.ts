import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/util/res/BaseResponse';
import { DevGuard } from '../common/guard/devGuard';
import { baseResponeStatus } from './../common/util/res/baseStatusResponse';
import { AnswerCreateInputDTO } from './dto/create_answer.dto';
import { AnswerUpdateInputDTO } from './dto/update_answer.dto';
import { AnswerService } from './provider/answer.service';

@ApiExtraModels(AnswerCreateInputDTO, AnswerUpdateInputDTO)
@ApiTags('Answer API')
@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  //   @ApiBearerAuth()
  //   @ApiOperation({
  //     summary: '답변 생성 API',
  //     description: `
  //       답변 생성 API입니다.
  //       관리자만 접근이 가능합니다.

  //       필요한 정보
  //       - question_id: 질문 - String ULID
  //     `,
  //   })
  @Post('/')
  @UseGuards(DevGuard)
  async createAnswer(@Body() answerInputDTO: AnswerCreateInputDTO) {
    const result = await this.answerService.createAnswer(answerInputDTO);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Patch('/:answer_id')
  @UseGuards(DevGuard)
  async updateAnswer(
    @Param('answer_id') answer_id: string,
    @Body() AnswerUpdateInputDTO: AnswerUpdateInputDTO,
  ) {
    const result = await this.answerService.updateAnswer({
      answer_id,
      ...AnswerUpdateInputDTO,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Put('/:answer_id')
  @UseGuards(DevGuard)
  async deleteStatusAnswer(@Param('answer_id') answer_id: string) {
    const result = await this.answerService.deleteStatusAnswer({
      answer_id,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
