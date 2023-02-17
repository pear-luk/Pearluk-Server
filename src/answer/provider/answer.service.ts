import { Injectable } from '@nestjs/common';
import { QuestionRepository } from '../../question/provider/question.repository';

@Injectable()
export class AnswerService {
  constructor(private questionRepo: QuestionRepository) {}
}
