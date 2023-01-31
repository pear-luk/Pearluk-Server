import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class AnswerCreateInputDTO
  implements Omit<Prisma.AnswerCreateInput, 'answer_id'> {}
