import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsPhoneNumber, IsString } from 'class-validator';
export class RecipientInfoCreateInputDTO
  implements Prisma.OrderRecipientInfoCreateWithoutOrderInput
{
  @IsString()
  name: string;

  @IsPhoneNumber('KR')
  @Transform(({ value }) => value.replace(/-/g, ''))
  phone_number: string;

  @IsString()
  full_address: string;

  @IsString()
  address: string;

  @IsString()
  detail_address: string;
}
