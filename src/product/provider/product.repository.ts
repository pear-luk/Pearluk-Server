import { Injectable } from '@nestjs/common';
import { E_status, Prisma } from '@prisma/client';
import { ulid } from 'ulid';
import { PrismaService } from './../../prisma/prisma.service';
import { ProductCreateInputDTO } from './../dto/create_product.dto';
import {
  ProductUpdateInputDTO,
  ProductUpdateManyInputDTO,
} from './../dto/update_product.dto';
import { IProductListQuery } from './../interface/product.query';

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
    const product = await this.prisma.product.findFirst({
      select: {
        product_id: true,
        name: true,
        price: true,
        introduce: true,
        quantity: true,
        product_status: true,
        archive: true,
        category: true,
        imgs: { orderBy: { sequence: 'asc' } },
      },
      where: info,
    });
    console.log(product);
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

  /**
   *  Offset 기반이기에 좋은선택은 아님.
   * (예 중복된 정보가 있을수 있음.)
   * 해결방법은 ? 커서기반으로 바꾸면 해결가능.
   * 커서기반은 마지막으로 조회한 PK 값을 받아서 그뒤에있는 n개 줘!
   * 우선 나중에 구현.
   */
  async getProductList({
    page,
    search,
    archive,
    parentCategory,
    childCategory,
  }: IProductListQuery) {
    const productName = search === 'undefined' ? undefined : search;
    const archive_id =
      archive && (archive === 'all' || archive === 'undefined')
        ? undefined
        : archive
        ? archive
        : undefined;
    const category_id =
      childCategory === 'all' || childCategory === 'undefined'
        ? undefined
        : childCategory;
    const parent_category_id =
      parentCategory === 'all' || parentCategory === 'undefined'
        ? undefined
        : parentCategory;
    const skip = !isNaN(Number([page])) ? (Number([page]) - 1) * 10 : 0;

    const products = await this.prisma.product.findMany({
      select: {
        product_id: true,
        name: true,
        price: true,
        introduce: true,
        quantity: true,
        product_status: true,
        archive: true,
        category: true,
        imgs: { orderBy: { sequence: 'asc' } },
      },
      where: {
        archive_id,
        name: { contains: productName },
        category: {
          category_id,
          parent_category_id,
        },
      },
      skip,
      take: 10,
      orderBy: {
        product_id: 'desc',
      },
    });
    const total_count = await this.prisma.product.count({
      where: {
        archive_id,
        name: { contains: productName },

        category: {
          category_id,
          parent_category_id,
        },
        status: 'ACTIVE',
      },
    });

    return { products, total_count };
  }

  async getProductListCount({ archive }: { archive: string }) {
    const archive_id =
      archive && archive === 'all' ? undefined : archive ? archive : undefined;

    const count = await this.prisma.product.count({
      where: {
        archive_id,
        status: 'ACTIVE',
      },
    });

    return count;
  }

  async updateManyProduct(
    productUpdateManyInputDTO: ProductUpdateManyInputDTO,
  ) {
    const { products, ...info } = productUpdateManyInputDTO;

    return await this.prisma.product.updateMany({
      where: { OR: products },
      data: info,
    });
  }

  /*question 더미데이터용 */
  async getDummyData() {
    const products = await this.prisma.product.findMany({
      take: 100,
    });
    return products;
  }
}
