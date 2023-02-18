import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsString } from 'class-validator';
import { IsULID } from 'src/common/decorator/IsULID';

export class AnswerCreateInputDTO
  implements Omit<Prisma.AnswerUncheckedCreateInput, 'answer_id'>
{
  @ApiProperty({
    name: 'contents',
    description: '답변 내용',
    type: 'string',
  })
  @IsString()
  contents: string;

  @ApiProperty({
    name: 'question_id',
    description: '질문 id',
    type: 'string',
  })
  @IsULID()
  question_id: string;
}

export const answerCreateInputEX: AnswerCreateInputDTO = {
  contents: '답변내용입니다ㅏㅏㅏ',
  question_id: '123445',
};

export const answerCreateResponseEX = {
  quesion_id: '123445',
  created_at: '2023-01-25T09:50:16.383Z',
  updated_at: '2023-01-25T09:50:16.383Z',
  status: 'ACTIVE',
};
