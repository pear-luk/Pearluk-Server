import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional } from 'class-validator';
import { IsULID } from 'src/common/decorator/IsULID';

export class OrderProductCreatInputDTO
  implements Prisma.OrderProductCreateWithoutOrderInput
{
  @IsULID()
  product_id: string;

  @IsNumber()
  count: number;

  @IsOptional()
  @IsULID()
  use_coppone?: string | null;

  @IsNumber()
  price: bigint | number;
}
