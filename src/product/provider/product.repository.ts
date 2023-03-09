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
        imgs: true,
      },
      where: info,
    });
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
  async getProductList({ page, archive }: { page: string; archive: string }) {
    const archive_id =
      archive && archive === 'all' ? undefined : archive ? archive : undefined;
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
        imgs: true,
      },
      where: { archive_id },
      skip,
      take: 10,
      orderBy: {
        product_id: 'desc',
      },
    });
    const total_count = await this.prisma.product.count({
      where: {
        archive_id,
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

  /*question 더미데이터용 */
  async getDummyData() {
    const products = await this.prisma.product.findMany({
      take: 100,
    });
    return products;
  }
}
