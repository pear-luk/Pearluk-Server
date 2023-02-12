import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { baseResponeStatus } from './../../common/util/res/baseStatusResponse';
import { ProductRepository } from './../../product/provider/product.repository';
import { CartRepository } from './cart.repository';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepo: CartRepository,
    private readonly productRepo: ProductRepository,
  ) {}

  async cartProductCreate(
    info: Omit<Prisma.CartProductUncheckedCreateInput, 'cart_product_id'>,
  ) {
    const { product_id } = info;
    const exist_product = await this.productRepo.findOneProduct({ product_id });
    if (!exist_product)
      throw new BadRequestException(baseResponeStatus.PRODUCT_NOT_EXIST);

    return await this.cartRepo.createCartProduct(info);
  }
}
