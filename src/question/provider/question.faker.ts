import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ulid } from 'ulid';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductRepository } from '../../product/provider/product.repository';

@Injectable()
export class QuestionFaker {
  constructor(
    private readonly productRepo: ProductRepository,
    private readonly prisma: PrismaService,
  ) {}

  async createQuestion() {
    const products = [...(await this.productRepo.getDummyData())];
    const fakerData: Prisma.QuestionUncheckedCreateInput[] = new Array(10000)
      .fill(0)
      .map(() => {
        const mock = {
          question_id: ulid(),
          product_id:
            products[
              faker.datatype.number({ min: 0, max: products.length - 1 })
            ].product_id,
          title: faker.lorem.words(3),
          contents: faker.lorem.lines(3),
          type: faker.datatype.number({ min: 0, max: 1 }),
          secret_mode: faker.datatype.number({ min: 0, max: 1 }),
          password: faker.lorem.words(10),
          user_id: '01GRHG8YXFWVHZ6272EZPGXRD9',
        };
        if (mock.type === 0) mock.product_id = null;
        if (mock.secret_mode === 0) mock.password = null;

        return mock;
      });
    return await this.prisma.question.createMany({ data: fakerData });
  }
}
