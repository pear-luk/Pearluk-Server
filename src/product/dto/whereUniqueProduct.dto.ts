import { Prisma } from '@prisma/client';
import { IsULID } from '../../common/decorator/IsULID';
export class ProductWhereUniqueInput implements Prisma.ProductWhereUniqueInput {
  @IsULID()
  product_id: string;
}
