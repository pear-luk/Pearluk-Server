import { Prisma } from '@prisma/client';

export class OrderProductCreatInputDTO
  implements Omit<Prisma.OrderProductCreateManyOrderInput, 'order_id'>
{
  product_id: string;
  count: number;
  use_coppone?: string | null;
  price: bigint | number;
}
