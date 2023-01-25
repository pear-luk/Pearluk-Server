import { Injectable } from '@nestjs/common';
import { E_status, Prisma } from '@prisma/client';
import { ulid } from 'ulid';
import { PrismaService } from './../../prisma/prisma.service';
import { ProductUpdateInputDTO } from './../dto/update_product.dto';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(info: Omit<Prisma.ProductCreateInput, 'product_id'>) {
    const newProduct = await this.prisma.product.create({
      data: {
        product_id: ulid(),
        ...info,
      },
    });
    return newProduct;
  }

  async findOneProduct(info: Prisma.ProductWhereInput) {
    const product = await this.prisma.product.findFirst({ where: info });
    return product;
  }

  async get() {
    const products = await this.prisma.product.findMany();
    return products;
  }

  async updateProduct(
    info: ProductUpdateInputDTO & Prisma.ProductWhereUniqueInput,
  ) {
    const { product_id, ...data } = info;
    const updatedProduct = await this.prisma.product.update({
      where: { product_id },
      data,
    });
    return updatedProduct;
  }

  async deleteStatusProduct(info: Prisma.ProductWhereUniqueInput) {
    const deletedProduct = await this.prisma.product.update({
      where: info,
      data: {
        status: E_status.DELETED,
      },
    });
    return deletedProduct;
  }
}
