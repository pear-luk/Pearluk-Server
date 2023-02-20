import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CustomerInfoCreateInputDTO } from './customer/create_customer.dto';
import { OrderProductCreatInputDTO } from './order_product/create_order_product.dto';
import { PaymentInfoCreateInputDTO } from './payment/create_payment_info.dto';
import { RecipientInfoCreateInputDTO } from './recipient/create_recipient_info.dto';
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
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  use_point?: bigint | number | null;

  @IsNumber()
  total_price: bigint | number;

  /**
   * -
   * -2. 반품/교환
   * -1. 주문취소
   * 0. 결제대기중
   * 1. 배송준비중
   * 2. 배송중
   * 3. 배송완료
   * 4. 구매확정
   */
  @IsNumber()
  order_status: number;

  @IsNumber()
  payment_status: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductCreatInputDTO)
  order_products: OrderProductCreatInputDTO[];

  @IsObject()
  @ValidateNested()
  @Type(() => CustomerInfoCreateInputDTO)
  customer_info: CustomerInfoCreateInputDTO;

  @IsObject()
  @ValidateNested()
  @Type(() => RecipientInfoCreateInputDTO)
  recipient_info: RecipientInfoCreateInputDTO;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PaymentInfoCreateInputDTO)
  payment_info?: PaymentInfoCreateInputDTO;
}
