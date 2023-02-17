import { Module } from '@nestjs/common';
import { QuestionModule } from '../question/question.module';
import { AnswerController } from './answer.controller';
import { AnswerRepository } from './provider/answer.repository';
import { AnswerService } from './provider/answer.service';

@Module({
  imports: [QuestionModule],
  controllers: [AnswerController],
  providers: [AnswerService, AnswerRepository],
})
export class AnswerModule {}
