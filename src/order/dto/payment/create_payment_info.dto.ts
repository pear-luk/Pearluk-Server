import { Prisma } from '@prisma/client';
import { IsString } from 'class-validator';
export class PaymentInfoCreateInputDTO
  implements Prisma.PaymentInfoCreateWithoutOrderInput
{
  @IsString()
  key: string;

  @IsString()
  method: string;

  @IsString()
  payment_status: string;
}
