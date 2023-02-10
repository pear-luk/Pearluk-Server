import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ulid } from 'ulid';
import { ArchiveRepository } from './../../archive/provider/archive.repository';
import { CategoryRepository } from './../../category/provider/category.repository';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductFaker {
  constructor(
    private readonly productRepo: ProductRepository,
    private readonly categoryRepo: CategoryRepository,
    private readonly archiveRepo: ArchiveRepository,
    private readonly prisma: PrismaService,
  ) {}

  async createProduct() {
    const categorys = await this.categoryRepo.getCategoryList();
    const archives = await this.archiveRepo.getArchiveListAll();
    const fakerData: Prisma.ProductUncheckedCreateInput[] = new Array(10000)
      .fill(0)
      .map(() => {
        return {
          product_id: ulid(),

          name: faker.lorem.words(3),
          price: faker.datatype.number({ min: 1000, max: 1000000 }),
          introduce: faker.lorem.lines(3),
          quantity: faker.datatype.number({ min: 1, max: 100 }),
          product_status: faker.datatype.number({ min: 0, max: 3 }),
          archive_id:
            archives[
              faker.datatype.number({ min: 0, max: archives.length - 1 })
            ].archive_id,
          category_id:
            categorys[
              faker.datatype.number({ min: 0, max: categorys.length - 1 })
            ].category_id,
        };
      });

    return await this.prisma.product.createMany({ data: fakerData });
  }
}
