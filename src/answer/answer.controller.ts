// import { Body, Controller, Post, UseGuards } from '@nestjs/common';
// import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
// import { AdminAuthGuard } from 'src/common/guard/adminGuard';
// import { JwtAccessAuthGuard } from 'src/common/guard/JWT/jwt.guard';
// import { BaseResponse } from 'src/common/util/res/BaseResponse';
// import { baseResponeStatus } from './../common/util/res/baseStatusResponse';
// import { AnswerService } from './provider/answer.service';

// @ApiTags('Answer API')
// @Controller('answer')
// export class AnswerController {
//   constructor(private readonly answerService: AnswerService) {}

// //   @ApiBearerAuth()
// //   @ApiOperation({
// //     summary: '답변 생성 API',
// //     description: `
// //       답변 생성 API입니다.
// //       관리자만 접근이 가능합니다.

// //       필요한 정보
// //       - question_id: 질문 - String ULID
// //       - product_id: 상품 - String ULID
// //     `,
// //   })
//   @Post('/')
//   @UseGuards(JwtAccessAuthGuard, AdminAuthGuard)
//   async createAnswer(@Body() answerInputDTO: AnswerCreateInputDTO) {
//     const result = await this.answerService.createAnswer(answerInputDTO);
//     return new BaseResponse(baseResponeStatus.SUCCESS, result);
//   }
// }
