import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumber } from 'class-validator';
import { IsULID } from 'src/common/decorator/IsULID';

export class QuestionCreateInputDTO
  implements Omit<Prisma.QuestionCreateInput, 'question_id'>
{
  @ApiProperty({
    name: 'type',
    description: '질문 유형',
    type: 'number',
    //enum 추가
  })
  @IsNumber()
  @ApiProperty({
    name: 'product_id',
    description: '상품 id',
    type: 'string',
  })
  @IsULID()
  product_id: string;
}
