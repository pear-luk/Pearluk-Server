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
    const users = await this.prisma.user.findMany();
    const fakerData: Prisma.QuestionUncheckedCreateInput[] = new Array(10000)
      .fill(0)
      .map(() => {
        const mock: Prisma.QuestionUncheckedCreateInput = {
          question_id: ulid(),
          product_id:
            products[
              faker.datatype.number({ min: 0, max: products.length - 1 })
            ].product_id,
          title: faker.lorem.words(3),
          contents: faker.lorem.lines(2),
          type: faker.datatype.number({ min: 0, max: 1 }),
          secret_mode: faker.datatype.number({ min: 0, max: 1 }),
          password: faker.lorem.words(10),
          user_id:
            users[faker.datatype.number({ min: 0, max: users.length - 1 })]
              .user_id,
        };

        if (mock.type === 0) mock.product_id = null;
        if (mock.secret_mode === 0) mock.password = null;

        return mock;
      });

    return await this.prisma.question.createMany({ data: fakerData });
  }
  async createQuestionImg() {
    const fakerData = await (
      await this.prisma.question.findMany()
    )
      .map((question) => {
        return Array(faker.datatype.number({ min: 0, max: 10 }))
          .fill(0)
          .map(() => ({
            question_id: question.question_id,
            question_img_id: ulid(),
            url: faker.image.animals(),
            sequence: faker.datatype.number({ min: 0, max: 10 }),
          }));
      })
      .map(async (fake) => {
        await this.prisma.questionImg.createMany({
          data: fake,
        });
      });
    return fakerData;
  }
}
