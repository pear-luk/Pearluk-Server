import { PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { QuestionCreateInputDTO } from './create_question.dto';

export class QuestionSecretInputDTO extends PickType(QuestionCreateInputDTO, [
  'password',
]) {
  @IsString()
  password: string;
}
