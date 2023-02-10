import { Injectable } from '@nestjs/common';
import { E_status, Prisma } from '@prisma/client';
import { ulid } from 'ulid';
import { PrismaService } from './../../prisma/prisma.service';
import { ProductCreateInputDTO } from './../dto/create_product.dto';
import { ProductUpdateInputDTO } from './../dto/update_product.dto';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(info: ProductCreateInputDTO) {
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

  async getProductLsit({ page, archive }: { page: string; archive: string }) {
    const archive_id =
      archive && archive === 'all' ? undefined : archive ? archive : undefined;
    const productList = await this.prisma.product.findMany({
      where: { archive_id: archive_id && '' },
      skip: (Number([page]) - 1) * 10,
      take: 10,
      orderBy: {
        // created_at: 'asc',
        archive_id: 'asc',
      },
    });
    return productList;
  }
}
