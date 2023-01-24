import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';
import { IsULID } from '../../common/decorator/IsULID';

export class CategoryCreateInputDTO
  implements Omit<Prisma.CategoryCreateInput, 'category_id'>
{
  @ApiProperty({
    name: 'name',
    description: '카테고리 이름',
  })
  @IsString()
  name: string;

  @ApiProperty({
    name: 'parent_category_id',
    description: '부모 카테고리 id - ULID',
    default: null,
    required: false,
  })
  @IsULID()
  @IsOptional()
  parent_category_id?: string = null;
}

export class CategoryCreateResponseDTO {
  category_id: string;
  name: string;
  parent_category_id: string;
}
export const CategoryCreateResponseEX = {
  category_id: '01GQJ0MA8FC3RFDZ0X3R793MRK',
  name: '남성asd용asd',
  parent_category_id: null,
  created_at: '2023-01-24T13:49:09.264Z',
  updated_at: '2023-01-24T13:49:09.264Z',
  status: 'ACTIVE',
};
