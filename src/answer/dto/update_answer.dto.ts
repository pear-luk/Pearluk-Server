import { PartialType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { AnswerCreateInputDTO } from './create_answer.dto';

export class AnswerUpdateInputDTO
  extends PartialType(AnswerCreateInputDTO)
  implements Prisma.AnswerUpdateInput
{
  @IsOptional()
  contents?: string;
}
export const upateAnswerInputEX = {
  contents: '답변 수정입니다',
};
