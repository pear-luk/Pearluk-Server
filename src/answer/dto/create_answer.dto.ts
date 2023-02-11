// import { ApiProperty } from '@nestjs/swagger';
// import { Prisma } from '@prisma/client';
// import { IsULID } from 'src/common/decorator/IsULID';

// export class AnswerCreateInputDTO
//   implements Omit<Prisma.AnswerCreateInput, 'answer_id'>
// {
//   @ApiProperty({
//     name: 'question_id',
//     description: '질문 id',
//     type: 'string',
//   })
//   @IsULID()
//   question_id: string;

//   @ApiProperty({
//     name: 'product_id',
//     descriptzion: '상품 id',
//     type: 'string',
//   })
//   @IsULID()
//   product_id: string;
// }

// export const answerCreateInputEX: AnswerCreateInputDTO = {
//   question_id: '123445',
//   product_id: '111',
// };

// export const answerCreateResponseEX = {
//   quesion_id: '123445',
//   product_id: '111',
//   created_at: '2023-01-25T09:50:16.383Z',
//   updated_at: '2023-01-25T09:50:16.383Z',
//   status: 'ACTIVE',
// };
