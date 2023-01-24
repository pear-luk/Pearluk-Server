import { Prisma } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';
import { IsULID } from '../../common/decorator/IsULID';

export class CategoryCreateInputDTO
  implements Omit<Prisma.CategoryCreateInput, 'category_id'>
{
  @IsString()
  name: string;

  @IsULID()
  @IsOptional()
  parent_category_id?: string = null;
}
