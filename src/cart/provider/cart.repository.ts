import { Injectable } from '@nestjs/common';
import { E_status, Prisma } from '@prisma/client';
import { ulid } from 'ulid';
import { PrismaService } from './../../prisma/prisma.service';

@Injectable()
export class CartRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getCartProductList(user_id: string) {
    return this.prisma.cartProduct.findMany({
      where: { user_id, status: 'ACTIVE' as E_status },
      select: {
        cart_product_id: true,
        product_id: true,
        count: true,
        product: true,
      },
    });
  }

  async createCartProduct(
    info: Omit<Prisma.CartProductUncheckedCreateInput, 'cart_product_id'>,
  ) {
    return await this.prisma.cartProduct.create({
      data: { cart_product_id: ulid(), ...info },
    });
  }

  async findOneCartProduct(info: Partial<Prisma.CartProductWhereInput>) {
    return await this.prisma.cartProduct.findFirst({ where: info });
  }

  async updateCartProduct(
    info: Prisma.CartProductUpdateManyMutationInput &
      Prisma.CartProductWhereUniqueInput,
  ) {
    const { cart_product_id, ...update_info } = info;

    return await this.prisma.cartProduct.update({
      where: { cart_product_id },
      data: update_info,
    });
  }

  async deleteCartProduct(cart_product_id: string) {
    return await this.prisma.cartProduct.update({
      where: { cart_product_id },
      data: { status: 'DELETED' },
    });
  }
}
