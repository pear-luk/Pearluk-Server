import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { baseResponeStatus } from './../../common/util/res/baseStatusResponse';
import { ProductRepository } from './../../product/provider/product.repository';
import { CartProductUpdateInputDTO } from './../dto/update_cart_product.dto';
import { CartRepository } from './cart.repository';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepo: CartRepository,
    private readonly productRepo: ProductRepository,
  ) {}

  async getCartProductList(user_id: string) {
    return await this.cartRepo.getCartProductList(user_id);
  }

  async cartProductCreate(
    info: Omit<Prisma.CartProductUncheckedCreateInput, 'cart_product_id'>,
  ) {
    const { product_id } = info;
    const exist_product = await this.productRepo.findOneProduct({ product_id });
    if (!exist_product)
      throw new BadRequestException(baseResponeStatus.PRODUCT_NOT_EXIST);

    return await this.cartRepo.createCartProduct(info);
  }

  async cartProductUpdate(
    info: CartProductUpdateInputDTO &
      Pick<Prisma.CartProductUncheckedCreateInput, 'user_id'>,
  ) {
    const { user_id, cart_product_id, ...update_info } = info;
    const exist = await this.cartRepo.findOneCartProduct({
      cart_product_id,
    });

    if (!exist)
      throw new BadRequestException(baseResponeStatus.CART_PRODUCT_NOT_EXIST);
    if (user_id !== exist.user_id)
      throw new BadRequestException(baseResponeStatus.CART_PRODUCT_INVALID);

    return await this.cartRepo.updateCartProduct({
      cart_product_id,
      ...update_info,
    });
  }
}
