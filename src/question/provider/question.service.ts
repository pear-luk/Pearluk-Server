import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { baseResponeStatus } from '../../common/util/res/baseStatusResponse';
import { UserRepository } from '../../user/provider/user.repository';
import { QuestionCreateInputDTO } from '../dto/create_question.dto';
import { QuestionSecretInputDTO } from '../dto/secret_question.dto';
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

  async createQuestion(info: QuestionCreateInputDTO & { user_id: string }) {
    const { product_id, user_id, secret_mode, password } = info;
    const productExist =
      product_id &&
      (await this.productRepo.findOneProduct({
        product_id,
      }));
    if (!productExist && product_id)
      throw new BadRequestException(baseResponeStatus.PRODUCT_NOT_EXIST);

    const userExist = await this.userRepo.findOneUser({
      user_id,
    });
    if (!userExist)
      throw new BadRequestException(baseResponeStatus.USER_NOT_EXIST);

    if (secret_mode == 0 && password)
      throw new BadRequestException(baseResponeStatus.PASSWORD_NOT_NEEDED);
    if (secret_mode == 1 && !password)
      throw new BadRequestException(baseResponeStatus.PASSWORD_NEEDED);

    const hashed_password =
      secret_mode === 1 && (await this.transformPassword(password));

    // await this.transformPassword(password),
    const newQuestion = await this.questionRepo.createQuestion({
      ...info,
      password: hashed_password || null,
    });
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
      throw new BadRequestException(baseResponeStatus.PASSWORD_NOT_NEEDED);

    if (secret_mode == 1 && !password)
      throw new BadRequestException(baseResponeStatus.PASSWORD_NEEDED);

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
    console.log(exist);
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
    return await this.questionRepo.getQuestionList({
      product,
      user,
      type,
      page,
    });
  }

  async getSecretQuestion(
    info: Prisma.QuestionWhereUniqueInput & QuestionSecretInputDTO,
  ) {
    const { question_id, password } = info;
    const exist = await this.questionRepo.findOneQuestion({
      question_id,
    });
    if (!exist)
      throw new BadRequestException(baseResponeStatus.QUESTION_NOT_EXIST);
    if (!password)
      throw new BadRequestException(baseResponeStatus.PASSWORD_NEEDED);

    if (
      !(await this.comparePassword({
        password,
        hashed_password: exist.password,
      }))
    )
      throw new BadRequestException(
        baseResponeStatus.QUESTION_PASSWORD_INVALID,
      );
    return exist;
  }

  // async getQuestionList({page,product,user,type}:{page:string; product:string; user:string;type:number;}){
  //   return await this.questionRepo.
  // }

  /**** hash ****/

  async transformPassword(password: string) {
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
