import { Module } from '@nestjs/common';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from '../user/user.module';
import { QuestionFaker } from './provider/question.faker';
import { QuestionRepository } from './provider/question.repository';
import { QuestionService } from './provider/question.service';
import { QuestionController } from './question.controller';

@Module({
  imports: [ProductModule, UserModule],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionRepository, QuestionFaker],
  exports: [],
})
export class QuestionModule {}
