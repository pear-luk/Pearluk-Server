import { Prisma } from '@prisma/client';
export class RecipientInfoCreateInputDTO
  implements Omit<Prisma.OrderRecipientInfoCreateInput, 'order_id'>
{
  name: string;
  phone_number: string;
  full_address: string;
  address: string;
  detail_address: string;
}
