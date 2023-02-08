import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './provider/question.service';
import { ProductModule } from 'src/product/product.module';
import { QuestionRepository } from './provider/question.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ProductModule, UserModule],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionRepository],
  exports: [],
})
export class QuestionModule {}
