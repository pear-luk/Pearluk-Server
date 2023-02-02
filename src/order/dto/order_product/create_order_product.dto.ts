import { Prisma } from '@prisma/client';

export class OrderProductCreatInputDTO
  implements Prisma.OrderProductCreateWithoutOrderInput
{
  product_id: string;
  count: number;
  use_coppone?: string | null;
  price: bigint | number;
}
