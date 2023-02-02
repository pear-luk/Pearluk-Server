import { Prisma } from '@prisma/client';
export class CustomerInfoCreateInputDTO
  implements Prisma.OrderCustomerInfoCreateWithoutOrderInput
{
  name: string;
  phone_number: string;
}
