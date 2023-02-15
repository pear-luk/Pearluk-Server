import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CartProductUpdateInputDTO } from './update_cart_product.dto';
export class CartDeleteInputDTO {
  @IsArray()
  @Type(() => CartProductUpdateInputDTO)
  @ValidateNested({ each: true })
  product_list: CartProductUpdateInputDTO[];
}
