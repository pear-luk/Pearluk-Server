import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class QuestionCreateInputDTO
  implements Omit<Prisma.QuestionCreateInput, 'question_id'> {}
