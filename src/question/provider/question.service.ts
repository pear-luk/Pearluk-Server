import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, Question } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { baseResponeStatus } from '../../common/util/res/baseStatusResponse';
import { UserRepository } from '../../user/provider/user.repository';
import { QuestionCreateInputDTO } from '../dto/create_question.dto';
import { QuestionUpdateInputDTO } from '../dto/update_question.dto';
import { ProductRepository } from './../../product/provider/product.repository';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionService {
  constructor(
    private readonly questionRepo: QuestionRepository,
    private readonly productRepo: ProductRepository,
    private readonly userRepo: UserRepository,
    private readonly config: ConfigService,
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

  async getQuestion(info: Prisma.QuestionWhereUniqueInput) {
    const exist = await this.questionRepo.findOneQuestion(info);
    if (!exist)
      throw new BadRequestException(baseResponeStatus.QUESTION_NOT_EXIST);
    const value = {
      question_id: exist.question_id,
      title: exist.title,
      secret_mode: exist.secret_mode,
    };
    if (exist.secret_mode) return value;
    return exist;
  }
  //hash
  async transformPassword({ password }: Pick<Question, 'password'>) {
    const hashed_password = await bcrypt.hash(
      password,
      Number(this.config.get('HASH_SALT')),
    );
    return hashed_password;
  }

  async comparePassword({
    password,
    hashed_password,
  }: {
    password: string;
    hashed_password: string;
  }): Promise<boolean> {
    return await bcrypt.compare(password, hashed_password);
  }
}
