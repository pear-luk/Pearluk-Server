import { Prisma } from '@prisma/client';
import { CustomerInfoCreateInputDTO } from './customer/create_customer.dto';
import { OrderProductCreatInputDTO } from './order_product/create_order_product.dto';
import { PaymentInfoCreateInputDTO } from './payment/create_payment_info.dto';
export class OrderCreateInputDTO
  implements
    Omit<
      Prisma.OrderCreateInput,
      | 'user_id'
      | 'order_id'
      | 'order_products'
      | 'customer_info'
      | 'recipient_info'
      | 'payment_info'
    >
{
  name: string;
  use_point?: bigint | number | null;
  total_price: bigint | number;
  order_status: number;
  payment_status: number;
  order_products: OrderProductCreatInputDTO[];
  customer_info: CustomerInfoCreateInputDTO;
  recipient_info: CustomerInfoCreateInputDTO;
  payment_info: PaymentInfoCreateInputDTO;
}
