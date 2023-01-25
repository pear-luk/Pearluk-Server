import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseResponse } from './../common/util/res/BaseResponse';
import { baseResponeStatus } from './../common/util/res/baseStatusResponse';
import { ProductCreateInputDTO } from './dto/create_product.dto';
import { ProductService } from './provider/product.service';

@ApiTags('Product API')
@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/')
  async createProduct(@Body() productCreateInputDTO: ProductCreateInputDTO) {
    const result = await this.productService.createProduct(
      productCreateInputDTO,
    );

    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
