import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';
import { IsULID } from 'src/common/decorator/IsULID';
import { E_QuestionType } from '../interface/question_type.enum';

export class QuestionCreateInputDTO
  implements Omit<Prisma.QuestionCreateInput, 'question_id'>
{
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
  @ApiProperty({
    name: 'product_id',
    description: '상품 id',
    type: 'string',
  })
  @IsULID()
  product_id: string;
}
