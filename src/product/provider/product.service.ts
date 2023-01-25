import { Injectable } from '@nestjs/common';
import { ProductCreateInputDTO } from './../dto/create_product.dto';
import { ProductRepository } from './product.repository';
@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}

  async createProduct(info: ProductCreateInputDTO) {
    const newProduct = await this.productRepo.createProduct(info);
    return newProduct;
  }
}
