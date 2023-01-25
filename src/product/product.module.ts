import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductRepository } from './provider/product.repository';
import { ProductService } from './provider/product.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [],
})
export class ProductModule {}
