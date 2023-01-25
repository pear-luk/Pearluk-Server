import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { E_ProductStatus } from './../interface/product_status.enum';
import { ProductCreateInputDTO } from './create_product.dto';
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
