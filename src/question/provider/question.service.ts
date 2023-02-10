import { Injectable } from '@nestjs/common';
import { ProductRepository } from './../../product/provider/product.repository';
import { UserRepository } from '../../user/provider/user.repository';
import { QuestionCreateInputDTO } from '../dto/create_question.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuestionService {
  constructor(
    private readonly productRepo: ProductRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async createQuestion(info: QuestionCreateInputDTO) {
    return 'createQuestion';
  }

  //   async updateQuestion(
  //     info: QuestionCreateInputDTO & Prisma.QuestionWhereUniqueInput,
  //   ) {}

  //   async deleteStatusQuestion(info: Prisma.QuestionWhereUniqueInput) {}
}
