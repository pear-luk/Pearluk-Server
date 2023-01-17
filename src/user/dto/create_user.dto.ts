import { Prisma } from '@prisma/client';

export class UserCreateInputDTO
  implements Omit<Prisma.UserCreateInput, 'user_id'>
{
  email: string;
  name: string;
}
