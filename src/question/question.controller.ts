import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/common/guard/adminGuard';
import { JwtAccessAuthGuard } from 'src/common/guard/JWT/jwt.guard';
import { QuestionService } from './question.service';

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
      - type
      - product_id: 상품 - String ULID
    `,
  })
  @Post('/')
  @UseGuards(JwtAccessAuthGuard, AdminAuthGuard)
  async createQuestion(@Body() questionInputDTO: QuestionCreateInputDTO) {}
}
