import { Injectable } from '@nestjs/common';
import { E_status, Prisma } from '@prisma/client';
import { ulid } from 'ulid';
import { PrismaService } from './../../prisma/prisma.service';

@Injectable()
export class AnswerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAnswer(info: Omit<Prisma.AnswerCreateInput, 'answer_id'>) {
    const newAnswer = await this.prisma.answer.create({
      data: {
        answer_id: ulid(),
        ...info,
      },
    });
    return newAnswer;
  }
}
