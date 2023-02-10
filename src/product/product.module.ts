import { Module } from '@nestjs/common';
import { ArchiveModule } from './../archive/archive.module';
import { CategoryModule } from './../category/category.module';
import { ProductController } from './product.controller';
import { ProductFaker } from './provider/product.faker';
import { ProductRepository } from './provider/product.repository';
import { ProductService } from './provider/product.service';

@Module({
  imports: [ArchiveModule, CategoryModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, ProductFaker],
  exports: [ProductRepository],
})
export class ProductModule {}
