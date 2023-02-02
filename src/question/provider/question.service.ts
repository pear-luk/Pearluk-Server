import { Injectable } from '@nestjs/common';
import { ProductRepository } from './../../product/provider/product.repository';
import { QuestionCreateInputDTO } from '../dto/create_question.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuestionService {
  constructor(private readonly productRepo: ProductRepository) {}

  async createQuestion(info: QuestionCreateInputDTO) {
    const productExist = await this.productRepo.findOneProduct({
      product_id,
    });
  }

  async updateQuestion(
    info: QuestionCreateInputDTO & Prisma.QuestionWhereUniqueInput,
  ) {}

  async deleteStatusQuestion(info: Prisma.QuestionWhereUniqueInput) {}
}
