import { Module } from '@nestjs/common';
import { ArchiveModule } from './../archive/archive.module';
import { CategoryModule } from './../category/category.module';
import { ProductController } from './product.controller';
import { ProductRepository } from './provider/product.repository';
import { ProductService } from './provider/product.service';

@Module({
  imports: [ArchiveModule, CategoryModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [],
})
export class ProductModule {}
