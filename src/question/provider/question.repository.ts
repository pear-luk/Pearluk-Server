import { Injectable } from '@nestjs/common';
import { E_status, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ulid } from 'ulid';
import { QuestionUpdateInputDTO } from '../dto/update_question.dto';

@Injectable()
export class QuestionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createQuestion(info: Omit<Prisma.QuestionCreateInput, 'question_id'>) {
    const newQuestion = await this.prisma.question.create({
      data: {
        question_id: ulid(),
        ...info,
      },
    });
    return newQuestion;
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
}
