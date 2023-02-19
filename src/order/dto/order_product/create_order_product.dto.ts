import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { IsULID } from 'src/common/decorator/IsULID';

export class OrderProductCreatInputDTO
  implements
    Omit<
      Prisma.OrderProductUncheckedCreateInput,
      'order_id' | 'order_product_id'
    >
{
  @IsULID()
  product_id: string;

  @IsNumber()
  count: number;

  @IsOptional()
  @IsULID()
  use_coppone?: string | null;

  @IsNumber()
  price: bigint | number;

  @IsOptional()
  @Transform(() => undefined)
  product?: undefined;
}
