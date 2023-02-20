import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { baseResponeStatus } from './../../common/util/res/baseStatusResponse';
import { ProductRepository } from './../../product/provider/product.repository';
import { CurrentUserDTO } from './../../user/dto/current_user.dto';

import { CartDeleteInputDTO } from './../dto/delete_cart.dto';

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

  async createCartProduct(
    info: Omit<Prisma.CartProductUncheckedCreateInput, 'cart_product_id'>,
  ) {
    const { product_id, user_id } = info;
    const exist_product = await this.productRepo.findOneProduct({ product_id });
    if (!exist_product)
      throw new BadRequestException(baseResponeStatus.PRODUCT_NOT_EXIST);
    const exist_cart_product = await this.cartRepo.findOneCartProduct({
      user_id,
      product_id,
      status: 'ACTIVE',
    });
    if (exist_cart_product)
      throw new BadRequestException(baseResponeStatus.CART_PRODUCT_EXIST);

    return await this.cartRepo.createCartProduct(info);
  }

  async updateCartProduct(
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

  async deleteCartProduct({
    user_id,
    cart_product_id,
  }: {
    user_id: string;
    cart_product_id: string;
  }) {
    const exist = await this.cartRepo.findOneCartProduct({
      cart_product_id,
    });

    if (!exist)
      throw new BadRequestException(baseResponeStatus.CART_PRODUCT_NOT_EXIST);
    if (user_id !== exist.user_id)
      throw new BadRequestException(baseResponeStatus.CART_PRODUCT_INVALID);

    return await this.cartRepo.deleteCartProduct(cart_product_id);
  }


  async deleteCart(data: CartDeleteInputDTO & CurrentUserDTO) {
    return await this.cartRepo.deleteCart(data);

  }
}
