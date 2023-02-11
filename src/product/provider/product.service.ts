import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ArchiveRepository } from './../../archive/provider/archive.repository';
import { CategoryRepository } from './../../category/provider/category.repository';
import { baseResponeStatus } from './../../common/util/res/baseStatusResponse';
import { ProductCreateInputDTO } from './../dto/create_product.dto';
import { ProductUpdateInputDTO } from './../dto/update_product.dto';
import { ProductRepository } from './product.repository';
@Injectable()
export class ProductService {
  constructor(
    private readonly productRepo: ProductRepository,
    private readonly categoryRepo: CategoryRepository,
    private readonly archiveRepo: ArchiveRepository,
  ) {}

  async createProduct(info: ProductCreateInputDTO) {
    const { category_id, archive_id } = info;
    const categoryExist = await this.categoryRepo.findOneCategory({
      category_id,
    });
    if (!categoryExist)
      throw new BadRequestException(baseResponeStatus.CATEGORY_NOT_EXIST);

    const archiveExist = await this.archiveRepo.findOneArcive({ archive_id });
    if (!archiveExist)
      throw new BadRequestException(baseResponeStatus.ARCHIVE_NOT_EXIST);

    const newProduct = await this.productRepo.createProduct(info);
    return newProduct;
  }

  async updateProduct(
    info: ProductUpdateInputDTO & Prisma.ProductWhereUniqueInput,
  ) {
    const { category_id, archive_id, product_id } = info;
    const productExist = await this.productRepo.findOneProduct({ product_id });
    if (!productExist)
      throw new BadRequestException(baseResponeStatus.PRODUCT_NOT_EXIST);

    const categoryExist =
      category_id &&
      (await this.categoryRepo.findOneCategory({
        category_id,
      }));

    if (category_id && !categoryExist)
      throw new BadRequestException(baseResponeStatus.CATEGORY_NOT_EXIST);

    const archiveExist =
      archive_id && (await this.archiveRepo.findOneArcive({ archive_id }));

    if (archive_id && !archiveExist)
      throw new BadRequestException(baseResponeStatus.ARCHIVE_NOT_EXIST);

    const updatedProduct = await this.productRepo.updateProduct(info);
    return updatedProduct;
  }

  async deleteStatusProduct(info: Prisma.ProductWhereUniqueInput) {
    const exist = await this.productRepo.findOneProduct(info);
    if (!exist)
      throw new BadRequestException(baseResponeStatus.PRODUCT_NOT_EXIST);

    const deletedProduct = await this.productRepo.deleteStatusProduct(info);

    return deletedProduct;
  }

  async getProductList({ page, archive }: { page: string; archive: string }) {
    return await this.productRepo.getProductLsit({
      page,
      archive,
    });
  }
}
