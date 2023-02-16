import { Injectable } from '@nestjs/common';
import { E_status, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ulid } from 'ulid';
import { QuestionUpdateInputDTO } from '../dto/update_question.dto';

@Injectable()
export class QuestionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createQuestion(
    info: Omit<Prisma.QuestionUncheckedCreateInput, 'question_id'>,
  ) {
    const newQuestion = await this.prisma.question.create({
      data: {
        question_id: ulid(),
        ...info,
      },
    });
    return newQuestion;
  }

  async findOneQuestion(info: Prisma.QuestionWhereInput) {
    const question = await this.prisma.question.findFirst({ where: info });
    return question;
  }

  async get() {
    const questions = await this.prisma.question.findMany();
    return questions;
  }

  async updateQuestion(
    info: QuestionUpdateInputDTO & Prisma.QuestionWhereUniqueInput,
  ) {
    const { question_id, ...data } = info;
    const updatedQuestion = await this.prisma.question.update({
      where: { question_id },
      data,
    });
    return updatedQuestion;
  }

  async deleteStatusQuestion(info: Prisma.QuestionWhereUniqueInput) {
    const deletedQuestion = await this.prisma.question.update({
      where: info,
      data: {
        status: E_status.DELETED,
      },
    });
    return deletedQuestion;
  }

  /*** 조회 ***/
  async getQuestionList({
    product,
    user,
    type,
    page,
  }: {
    product: string;
    user: string;
    type: number;
    page: string;
  }) {
    const product_id =
      product && product === 'all' ? undefined : product ? product : undefined;
    const user_id =
      user && user === 'all' ? undefined : user ? user : undefined;
    const skip = !isNaN(Number([page])) ? (Number([page]) - 1) * 10 : 0;
    const questions = await this.prisma.question.findMany({
      where: { product_id, user_id, type },
      skip,
      take: 10,
    });
    const total_count = await this.prisma.question.count({
      where: {
        product_id,
        user_id,
        type,
        status: 'ACTIVE',
      },
    });
    console.log(product_id, user_id, type);

    return { questions, total_count };
  }

  // async getQuestionListCount({
  //   product,
  //   user,
  //   type,
  // }: {
  //   product: string;
  //   user: string;
  //   type: number;
  // }) {
  //   const product_id =
  //     product && product === 'all' ? undefined : product ? product : undefined;
  //   const user_id =
  //     user && user === 'all' ? undefined : user ? user : undefined;
  //   const count = await this.prisma.question.count({
  //     where: {
  //       product_id,
  //       user_id,
  //       type,
  //       status: 'ACTIVE',
  //     },
  //   });
  //   return count;
  // }
}
