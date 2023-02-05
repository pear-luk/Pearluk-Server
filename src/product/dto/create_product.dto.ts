import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsString, Min } from 'class-validator';
import { IsULID } from '../../common/decorator/IsULID';
import { E_ProductStatus } from '../interface/product_status.enum';

export class ProductCreateInputDTO
  implements
    Omit<Prisma.ProductCreateInput, 'product_id' | 'archive' | 'category'>
{
  @ApiProperty({
    name: 'name',
    description: '상품 이름',
  })
  @IsString()
  name: string;

  @ApiProperty({
    name: 'price',
    description: '상품 가격',
    type: 'bigint',
  })
  @IsNumber()
  @Min(1000)
  price: number | bigint;

  @ApiProperty({
    name: 'introduce',
    description: '상품 소개',
    type: 'string',
  })
  @IsString()
  introduce: string;

  @ApiProperty({
    name: 'quantity',
    description: '상품 수량',
    type: 'number',
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({
    name: 'product_status',
    description: '상품 판매 상태',
    type: 'number',
    enum: E_ProductStatus,
    default: 1,
  })
  @IsNumber()
  @IsEnum(E_ProductStatus)
  @Transform(({ value }) =>
    !isNaN(Number(value)) ? Number(value) : E_ProductStatus[value],
  )
  product_status: E_ProductStatus = 1;

  @ApiProperty({
    name: 'archive_id',
    description: '아카이브 id',
    type: 'string',
  })
  @IsULID()
  archive_id: string;

  @ApiProperty({
    name: 'category_id',
    description: '카테고리 id',
    type: 'string',
  })
  @IsULID()
  category_id: string;
}

export const productCreateInputEX: ProductCreateInputDTO = {
  name: '흑기사의 흑진주',
  price: 99999999999999,
  introduce: '흑기사의 전리품이다',
  quantity: 1,
  product_status: 1,
  archive_id: '01GQHMJ6M796AS8BTJ3GCMPZAW',
  category_id: '01GQHV1R2AEM4TMQ0SRC749KWS',
};

export const productCreateResponseEX = {
  product_id: '01GQM5BM9XGV78ZXP3A44XMCFT',
  name: '흑기사의 흑진주',
  price: 99999999999999,
  introduce: '흑기사의 전리품이다',
  quantity: 1,
  product_status: 1,
  archive_id: '01GQHMJ6M796AS8BTJ3GCMPZAW',
  category_id: '01GQHV1R2AEM4TMQ0SRC749KWS',
  created_at: '2023-01-25T09:50:16.383Z',
  updated_at: '2023-01-25T09:50:16.383Z',
  status: 'ACTIVE',
};
