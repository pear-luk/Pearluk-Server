import { PartialType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { QuestionCreateInputDTO } from './create_question.dto';

export class QuestionUpdateInputDTO
  extends PartialType(QuestionCreateInputDTO)
  implements Prisma.QuestionUpdateInput
{
  @IsOptional()
  contents?: string;

  @IsOptional()
  type?: number;

  @IsOptional()
  secret_mode?: number;

  @IsOptional()
  password?: string;

  @IsOptional()
  product_id?: string;
}
export const updateQuestionInputEX = {
  contents: '질문 수정입니다ㅏㅏㅏ',
  type: 1,
  secret_mode: 0,
  product_id: '123455555',
};
