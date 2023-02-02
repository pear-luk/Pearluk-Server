import { Prisma } from '@prisma/client';
import { CustomerInfoCreateInputDTO } from './customer/create_customer.dto';
import { OrderProductCreatInputDTO } from './order_product/create_order_product.dto';
export class OrderCreateInputDTO
  implements Omit<Prisma.OrderCreateInput, 'order_id'>
{
  user_id: string;
  name: string;
  use_point?: bigint | number | null;
  total_price: bigint | number;
  order_status: number;
  payment_status: number;
  order_products: OrderProductCreatInputDTO[];
  // customer_info: CustomerInfoCreateInputDTO;

  // customer_info?: OrderCustomerInfoCreateNestedOneWithoutOrderInput;
  recipient_info?: CustomerInfoCreateInputDTO;
  // shipping?: ShippingCreateNestedOneWithoutOrderInput;
  // payment_info?: PaymentInfoCreateNestedOneWithoutOrderInput;
}
