import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CategoryCreateInputDTO } from './create_category.dto';

export class CategoryUpdateInputDTO extends PartialType(
  CategoryCreateInputDTO,
) {
  @IsOptional()
  name?: string;
}
