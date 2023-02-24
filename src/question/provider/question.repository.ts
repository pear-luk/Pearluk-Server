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
    const question = await this.prisma.question.findFirst({
      select: {
        question_id: true,
        title: true,
        type: true,
        secret_mode: true,
        product_id: true,
        created_at: true,
        user: {
          select: {
            nickname: true,
          },
        },
        password: true,
        imgs: true,
        answers: {
          select: {
            answer_id: true,
            contents: true,
            created_at: true,
            imgs: true,
          },
        },
      },
      where: { ...info, status: 'ACTIVE' },
    });
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
    product?: string;
    user?: string;
    type?: string;
    page?: string;
  }) {
    const product_id =
      product && product === 'all' ? undefined : product ? product : undefined;

    const user_id =
      user && user === 'all' ? undefined : user ? user : undefined;

    const skip = !isNaN(Number(page)) ? (Number(page) - 1) * 20 : 0;

    const _type = !isNaN(Number(type)) ? Number(type) : { in: [0, 1] };

    const questions = await this.prisma.question.findMany({
      select: {
        question_id: true,
        title: true,
        type: true,
        secret_mode: true,
        product_id: true,
        created_at: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },

      where: { product_id, user_id, type: _type },
      skip,
      take: 20,
      orderBy: {
        question_id: 'desc',
      },
    });
    const total_count = await this.prisma.question.count({
      where: {
        product_id,
        user_id,
        type: _type,
        status: 'ACTIVE',
      },
    });

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
