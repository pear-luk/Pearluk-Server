import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsULID } from 'src/common/decorator/IsULID';
import { E_QuestionType } from '../interface/question_type.enum';

export class QuestionCreateInputDTO
  implements Omit<Prisma.QuestionCreateInput, 'question_id'>
{
  @ApiProperty({
    name: 'contents',
    description: '질문 내용',
    type: 'string',
  })
  @IsString()
  contents: string;

  @ApiProperty({
    name: 'type',
    description: '질문 유형',
    type: 'number',
    enum: E_QuestionType,
    default: 0,
  })
  @IsNumber()
  @IsEnum(E_QuestionType)
  @Transform(({ value }) =>
    !isNaN(Number(value)) ? Number(value) : E_QuestionType[value],
  )
  type: E_QuestionType = 0;

  @ApiProperty({
    name: 'secret_mode',
    description: '질문 비공개 유무',
    type: 'number',
    default: 0,
  })
  @IsNumber()
  secret_mode: number;

  @ApiProperty({
    name: 'product_id',
    description: '상품 id',
    type: 'string',
  })
  @IsOptional()
  @IsULID()
  product_id?: string;
}

export const questionCreateInputEX: QuestionCreateInputDTO = {
  type: 0,
  contents: '질문있어요오오오오',
  secret_mode: 0,
  product_id: '12345',
};
export const questionCreateResponseEX = {
  type: 0,
  product_id: '12345',
  created_at: '2023-01-25T09:50:16.383Z',
  updated_at: '2023-01-25T09:50:16.383Z',
  status: 'ACTIVE',
};
