import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './provider/question.service';
import { ProductModule } from 'src/product/product.module';
import { QuestionRepository } from './provider/question.repository';

@Module({
  imports: [ProductModule],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionRepository],
  exports: [],
})
export class QuestionModule {}
