import { Module } from '@nestjs/common';
import { CategoryController } from './category.controllet';
import { CategoryRepository } from './provider/category.repository';
import { CategoryService } from './provider/category.service';

@Module({
  imports: [],
  providers: [CategoryService, CategoryRepository],
  controllers: [CategoryController],
  exports: [],
})
export class CategoryModule {}
