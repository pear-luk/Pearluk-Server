import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
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
    name: 'user_id',
    description: '유저 id',
    type: 'string',
  })
  @IsULID()
  user_id: string;

  title: string;

  @ApiProperty({
    name: 'type',
    description: '질문 유형',
    type: 'number',
    enum: E_QuestionType,
  })
  @IsOptional()
  @IsNumber()
  @IsEnum(E_QuestionType)
  type?: number;

  @ApiProperty({
    name: 'secret_mode',
    description: '질문 비공개 유무',
    type: 'number',
  })
  @IsOptional()
  @IsNumber()
  secret_mode?: number;

  @ApiProperty({
    name: 'password',
    description: '질문 비공개 열람시 필요 비밀번호',
    type: 'string',
  })
  @IsOptional()
  @IsULID()
  password?: string;

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
  contents: '질문있어요오오오오',
  user_id: '3333333',
  title: 'ㅁㄴㅇㄹ',
  type: 0,
  secret_mode: 0,
  password: '23232323',
  product_id: '12345',
};
export const questionCreateResponseEX = {
  type: 0,
  product_id: '12345',
  created_at: '2023-01-25T09:50:16.383Z',
  updated_at: '2023-01-25T09:50:16.383Z',
  status: 'ACTIVE',
};
