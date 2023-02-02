import { Prisma } from '@prisma/client';
export class OrderCreateInputDTO
  implements Omit<Prisma.OrderCreateInput, 'order_id' | 'order_products'>
{
  user_id: string;
  name: string;
  use_point?: bigint | number | null;
  total_price: bigint | number;
  order_status: number;
  payment_status: number;
  order_products: OrderCreateInputDTO[];
}
