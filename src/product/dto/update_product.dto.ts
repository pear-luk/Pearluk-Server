import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { IsULID } from '../../common/decorator/IsULID';
import { E_ProductStatus } from './../interface/product_status.enum';
import { ProductCreateInputDTO } from './create_product.dto';
import { ProductWhereUniqueInput } from './whereUniqueProduct.dto';
export class ProductUpdateInputDTO extends PartialType(ProductCreateInputDTO) {
  @IsOptional()
  name?: string;

  @IsOptional()
  price?: number | bigint;

  @IsOptional()
  introduce?: string;

  @IsOptional()
  quantity?: number;

  @IsOptional()
  product_status?: E_ProductStatus;

  @IsOptional()
  archive_id?: string;

  @IsOptional()
  category_id?: string;
}

export const updateProductInputEX = {
  name: '반들반들 반짝반짝 진주 목걸이',
};

export class ProductUpdateManyInputDTO {
  @IsArray()
  @Type(() => ProductWhereUniqueInput)
  @ValidateNested({ each: true })
  products: ProductWhereUniqueInput[];

  @IsULID()
  @IsOptional()
  archive_id?: string;

  @IsULID()
  @IsOptional()
  category_id?: string;
}
