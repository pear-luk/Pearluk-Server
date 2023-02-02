import { Prisma } from '@prisma/client';
export class PaymentInfoCreateInputDTO
  implements Prisma.PaymentInfoCreateWithoutOrderInput
{
  key: string;
  method: string;
  payment_status: string;
}
