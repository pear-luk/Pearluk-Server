import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './provider/question.service';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
