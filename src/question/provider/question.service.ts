import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from './../../product/provider/product.repository';
import { UserRepository } from '../../user/provider/user.repository';
import { QuestionCreateInputDTO } from '../dto/create_question.dto';
import { Prisma } from '@prisma/client';
import { baseResponeStatus } from '../../common/util/res/baseStatusResponse';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionService {
  constructor(
    private readonly questionRepo: QuestionRepository,
    private readonly productRepo: ProductRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async createQuestion(info: QuestionCreateInputDTO) {
    const { product_id, user_id } = info;
    const productExist = await this.productRepo.findOneProduct({
      product_id,
    });
    if (!productExist)
      throw new BadRequestException(baseResponeStatus.PRODUCT_NOT_EXIST);

    const userExist = await this.userRepo.findOneUser({
      user_id,
    });
    if (!userExist)
      throw new BadRequestException(baseResponeStatus.USER_NOT_EXIST);

    const newQuestion = await this.questionRepo.createQuestion(info);
    return newQuestion;
  }

  //   async updateQuestion(
  //     info: QuestionCreateInputDTO & Prisma.QuestionWhereUniqueInput,
  //   ) {}

  //   async deleteStatusQuestion(info: Prisma.QuestionWhereUniqueInput) {}
}
