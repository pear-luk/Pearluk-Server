import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { E_status } from '@prisma/client';
import { ApiResponseDTO } from './../common/decorator/ApiResponse';
import { AdminAuthGuard } from './../common/guard/adminGuard';
import { JwtAccessAuthGuard } from './../common/guard/JWT/jwt.guard';
import { BaseResponse } from './../common/util/res/BaseResponse';
import { baseResponeStatus } from './../common/util/res/baseStatusResponse';
import {
  ProductCreateInputDTO,
  productCreateInputEX,
  productCreateResponseEX,
} from './dto/create_product.dto';
import {
  ProductUpdateInputDTO,
  ProductUpdateManyInputDTO,
  updateProductInputEX,
} from './dto/update_product.dto';
import { ProductFaker } from './provider/product.faker';
import { ProductService } from './provider/product.service';

@ApiExtraModels(ProductCreateInputDTO, ProductUpdateInputDTO)
@ApiTags('Product API')
@Controller('/products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,

    private readonly productFaker: ProductFaker,
  ) {}

  @ApiOperation({
    summary: '상품 생성 API',
    description: `
      상품 생성 API입니다
      
      필요한정보.
      - name: 상품 이름 - String
      - price: 상품 가격 - BigInt
      - introduce: 상품 소개 - String
      - quantity: 상품 개수 - Number
      - product_status: Enum (E_ProductStatus)
      - archive_id: 아카이브 id - String ULID
      - category_id: 카테고리 id - String ULID
    `,
  })
  @ApiBody({
    schema: { $ref: getSchemaPath(ProductCreateInputDTO) },
    examples: {
      PRODUCT: {
        description: `상품생성 예시`,
        value: productCreateInputEX,
      },
    },
  })
  @ApiResponseDTO(
    201,
    new BaseResponse(baseResponeStatus.SUCCESS, productCreateResponseEX),
    '성공',
  )
  @ApiResponseDTO(
    400.2,
    baseResponeStatus.ARCHIVE_NOT_EXIST,
    '아카이브가 존재하지 않을때',
  )
  @ApiResponseDTO(
    400.1,
    baseResponeStatus.CATEGORY_NOT_EXIST,
    '카테고리가 존재하지 않을때',
  )
  // @UseGuards(JwtAccessAuthGuard, AdminAuthGuard)
  @Post('/')
  async createProduct(@Body() productCreateInputDTO: ProductCreateInputDTO) {
    const result = await this.productService.createProduct(
      productCreateInputDTO,
    );

    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @ApiOperation({
    summary: '상품 생성 API',
    description: `
      상품 생성 API입니다
      
      params
      - product_id: 상품 id - String ULID

      필요한정보.
      - name: 상품 이름 - String
      - price: 상품 가격 - BigInt
      - introduce: 상품 소개 - String
      - quantity: 상품 개수 - Number
      - product_status: Enum (E_ProductStatus)
      - archive_id: 아카이브 id - String ULID
      - category_id: 카테고리 id - String ULID
    `,
  })
  @ApiBody({
    schema: { $ref: getSchemaPath(ProductUpdateInputDTO) },
    examples: {
      UPDATE_NAME: {
        description: '이름 변경 예시',
        value: updateProductInputEX,
      },
    },
  })
  @ApiResponseDTO(
    200,
    new BaseResponse(baseResponeStatus.SUCCESS, productCreateResponseEX),
    '성공',
  )
  @ApiResponseDTO(
    400.3,
    baseResponeStatus.PRODUCT_NOT_EXIST,
    '상품이 존재하지 않을때',
  )
  @ApiResponseDTO(
    400.2,
    baseResponeStatus.ARCHIVE_NOT_EXIST,
    '아카이브가 존재하지 않을때',
  )
  @ApiResponseDTO(
    400.1,
    baseResponeStatus.CATEGORY_NOT_EXIST,
    '카테고리가 존재하지 않을때',
  )
  @UseGuards(JwtAccessAuthGuard, AdminAuthGuard)
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

  @ApiOperation({
    summary: '상품 삭제 API',
    description: `
      상품 삭제 API입니다
      
      params
      - product_id: 상품 id - String ULID

    `,
  })
  @ApiParam({
    name: 'product_id',
    type: 'string',
    example: productCreateResponseEX.product_id,
  })
  @ApiResponseDTO(
    200,
    new BaseResponse(baseResponeStatus.SUCCESS, {
      ...productCreateResponseEX,
      status: E_status.DELETED,
    }),
    '성공',
  )
  @ApiResponseDTO(
    400.1,
    baseResponeStatus.PRODUCT_NOT_EXIST,
    '상품이 존재하지 않을때',
  )
  @UseGuards(JwtAccessAuthGuard, AdminAuthGuard)
  @Put('/:product_id')
  async deleteStatusProduct(@Param('product_id') product_id: string) {
    const result = await this.productService.deleteStatusProduct({
      product_id,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Post('/faker')
  async fakerData() {
    const result = await this.productFaker.createProduct();
    return result;
  }

  @Get('/')
  async getProductList(@Query() qurey) {
    console.log(qurey);
    const result = await this.productService.getProductList(qurey);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  /**
   * 상품 질문을 나눠서 가져오는것이 좋을까 한번에 가져오는것이 좋을까.
   */
  @Get('/:product_id')
  async getProduct(@Param('product_id') product_id: string) {
    const result = await this.productService.getProduct({ product_id });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Patch('/')
  async updateManyProduct(
    @Body() productUpdateManyInputDTO: ProductUpdateManyInputDTO,
  ) {
    const result = await this.productService.updateManyProduct(
      productUpdateManyInputDTO,
    );

    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
