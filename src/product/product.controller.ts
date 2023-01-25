import { Body, Controller, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseResponse } from './../common/util/res/BaseResponse';
import { baseResponeStatus } from './../common/util/res/baseStatusResponse';
import { ProductCreateInputDTO } from './dto/create_product.dto';
import { ProductUpdateInputDTO } from './dto/update_product.dto';
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

  @Patch('/:product_id')
  async updateProduct(
    @Param('product_id') product_id: string,
    @Body() productUpdateInputDTO: ProductUpdateInputDTO,
  ) {
    const result = await this.productService.updateProduct({
      ...productUpdateInputDTO,
      product_id,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Put('/:product_id')
  async deleteStatusProduct(@Param('product_id') product_id: string) {
    const result = await this.productService.deleteStatusProduct({
      product_id,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
