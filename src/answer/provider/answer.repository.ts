import { Injectable } from '@nestjs/common';
import { E_status, Prisma } from '@prisma/client';
import { ulid } from 'ulid';
import { AnswerUpdateInputDTO } from '../dto/update_answer.dto';
import { PrismaService } from './../../prisma/prisma.service';

@Injectable()
export class AnswerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAnswer(
    info: Omit<Prisma.AnswerUncheckedCreateInput, 'answer_id'>,
  ) {
    const newAnswer = await this.prisma.answer.create({
      data: {
        answer_id: ulid(),
        ...info,
      },
    });
    return newAnswer;
  }

  async findOneAnswer(info: Prisma.AnswerWhereInput) {
    const answer = await this.prisma.answer.findFirst({ where: info });
    return answer;
  }

  async updateAnswer(
    info: AnswerUpdateInputDTO & Prisma.AnswerWhereUniqueInput,
  ) {
    const { answer_id, ...data } = info;
    const updatedAnswer = await this.prisma.answer.update({
      where: { answer_id },
      data,
    });
    return updatedAnswer;
  }

  async deleteStatusAnswer(info: Prisma.AnswerWhereUniqueInput) {
    const deletedAnswer = await this.prisma.answer.update({
      where: info,
      data: {
        status: E_status.DELETED,
      },
    });
    return deletedAnswer;
  }
}
