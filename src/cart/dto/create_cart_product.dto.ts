import { Prisma } from '@prisma/client';
import { IsNumber } from 'class-validator';
import { IsULID } from '../../common/decorator/IsULID';

export class CartProductCreateInputDTO
  implements
    Omit<Prisma.CartProductUncheckedCreateInput, 'cart_product_id' | 'user_id'>
{
  @IsULID()
  product_id: string;

  @IsNumber()
  count: number;
}
