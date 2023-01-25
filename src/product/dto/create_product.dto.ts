import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsString, Min } from 'class-validator';
import { IsULID } from '../../common/decorator/IsULID';
import { E_ProductStatus } from '../interface/product_status.enum';

export class ProductCreateInputDTO
  implements Omit<Prisma.ProductCreateInput, 'product_id'>
{
  @IsString()
  name: string;

  @IsNumber()
  @Min(1000)
  price: number | bigint;

  @IsString()
  introduce: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @IsEnum(E_ProductStatus)
  @Transform(({ value }) =>
    !isNaN(Number(value)) ? Number(value) : E_ProductStatus[value],
  )
  product_status: E_ProductStatus;

  @IsULID()
  archive_id: string;

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
