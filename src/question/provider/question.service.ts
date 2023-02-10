import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from './../../product/provider/product.repository';
import { UserRepository } from '../../user/provider/user.repository';
import { QuestionCreateInputDTO } from '../dto/create_question.dto';
import { Prisma } from '@prisma/client';
import { baseResponeStatus } from '../../common/util/res/baseStatusResponse';
import { QuestionRepository } from './question.repository';
import { QuestionUpdateInputDTO } from '../dto/update_question.dto';
import { throwIfEmpty } from 'rxjs';

@Injectable()
export class QuestionService {
  constructor(
    private readonly questionRepo: QuestionRepository,
    private readonly productRepo: ProductRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async createQuestion(info: QuestionCreateInputDTO) {
    const { product_id, user_id, secret_mode, password } = info;
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

    if (secret_mode == 0 && password)
      throw new BadRequestException(
        '공개글이므로 비밀번호는 입력하지 않습니다',
      );
    if (secret_mode == 1 && !password)
      throw new BadRequestException('비밀글에 비밀번호가 필요합니다');

    const newQuestion = await this.questionRepo.createQuestion(info);
    return newQuestion;
  }

  async updateQuestion(
    info: QuestionUpdateInputDTO & Prisma.QuestionWhereUniqueInput,
  ) {
    const { question_id, product_id, secret_mode, password } = info;
    const questionExist = await this.questionRepo.findOneQuestion({
      question_id,
    });
    if (!questionExist)
      throw new BadRequestException(baseResponeStatus.QUESTION_NOT_EXIST);

    const productExist = await this.productRepo.findOneProduct({
      product_id,
    });
    if (!productExist)
      throw new BadRequestException(baseResponeStatus.PRODUCT_NOT_EXIST);

    if (secret_mode == 0 && password)
      throw new BadRequestException(
        '공개글이므로 비밀번호는 입력하지 않습니다',
      );

    if (secret_mode == 1 && !password)
      throw new BadRequestException('비밀글에 비밀번호가 필요합니다');

    const updatedQuestion = await this.questionRepo.updateQuestion(info);
    return updatedQuestion;
  }

  async deleteStatusQuestion(info: Prisma.QuestionWhereUniqueInput) {
    const exist = await this.questionRepo.findOneQuestion(info);
    if (!exist)
      throw new BadRequestException(baseResponeStatus.QUESTION_NOT_EXIST);

    const deletedQuestion = await this.questionRepo.deleteStatusQuestion(info);
    return deletedQuestion;
  }
}
