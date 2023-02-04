import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsPhoneNumber, IsString } from 'class-validator';
export class CustomerInfoCreateInputDTO
  implements Prisma.OrderCustomerInfoCreateWithoutOrderInput
{
  @IsString()
  name: string;

  @IsPhoneNumber('KR')
  @Transform(({ value }) => value.replace(/-/g, ''))
  phone_number: string;
}
