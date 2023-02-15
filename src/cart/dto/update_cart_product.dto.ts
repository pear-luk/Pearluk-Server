import { PartialType } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { IsULID } from '../../common/decorator/IsULID';
import { CartProductCreateInputDTO } from './create_cart_product.dto';

export class CartProductUpdateInputDTO extends PartialType(
  CartProductCreateInputDTO,
) {
  @IsULID()
  cart_product_id: string;

  @IsOptional()
  product_id?: string;

  @IsOptional()
  count?: number;

  @IsOptional()
  product: Product;
}
