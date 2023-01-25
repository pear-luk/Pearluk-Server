import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ulid } from 'ulid';
import { PrismaService } from './../../prisma/prisma.service';

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

  async get() {
    const products = await this.prisma.product.findMany();
    return products;
  }
}
