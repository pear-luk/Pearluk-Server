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
  async getQuestionList({ page }: { page: string }) {
    const skip = !isNaN(Number([page])) ? (Number([page]) - 1) * 10 : 0;
    const questions = await this.prisma.question.findMany({
      skip,
      take: 10,
    });
    const total_count = await this.prisma.question.count({
      where: {
        status: 'ACTIVE',
      },
    });

    return { questions, total_count };
  }

  async getQuestionListCount() {
    const count = await this.prisma.question.count({
      where: {
        status: 'ACTIVE',
      },
    });
    return count;
  }
}
