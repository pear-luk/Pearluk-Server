import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CategoryUpdateInputDTO } from '../dto/update_category.dto';
import { baseResponeStatus } from './../../common/util/res/baseStatusResponse';
import { CategoryCreateInputDTO } from './../dto/create_category.dto';
import { CategoryRepository } from './category.repository';
@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  /**리팩토링필요 */
  async createCategory(info: CategoryCreateInputDTO) {
    const { parent_category_id } = info;
    const parentCategory = parent_category_id
      ? await this.categoryRepo.findOneCategory({
          category_id: parent_category_id,
        })
      : false;

    if (parent_category_id && !parentCategory)
      throw new BadRequestException(baseResponeStatus.CATEGORY_NOT_EXIST);
    if (parentCategory && parentCategory.parent_category_id !== null) {
      throw new BadRequestException(baseResponeStatus.CATEGORY_INVALID);
    }

    const exist = await this.categoryRepo.findOneCategory(info);
    if (exist) throw new BadRequestException(baseResponeStatus.CATEGORY_EXIST);

    const newCategory = await this.categoryRepo.createCategory(info);

    return newCategory;
  }

  async getCategoryList() {
    return this.categoryRepo.getCategoryList();
  }

  async updateCategory(
    info: CategoryUpdateInputDTO & Prisma.CategoryWhereUniqueInput,
  ) {
    const { category_id, parent_category_id, name } = info;

    if (category_id === parent_category_id)
      throw new BadRequestException(baseResponeStatus.CATEGORY_INVALID);

    const existCategory = await this.categoryRepo.findOneCategory({
      category_id,
    });
    if (!existCategory)
      throw new BadRequestException(baseResponeStatus.CATEGORY_NOT_EXIST);

    const parentExist = parent_category_id
      ? await this.categoryRepo.findOneCategory({
          category_id: parent_category_id,
        })
      : false;
    if (parent_category_id && !parentExist)
      throw new BadRequestException(baseResponeStatus.CATEGORY_NOT_EXIST);
    if (parentExist && parentExist.parent_category_id !== null) {
      throw new BadRequestException(baseResponeStatus.CATEGORY_INVALID);
    }

    const existChildCategory = await this.categoryRepo.findOneCategory({
      parent_category_id,
      name,
    });
    if (existChildCategory)
      throw new BadRequestException(baseResponeStatus.CATEGORY_EXIST);

    const updatedCategory = await this.categoryRepo.updateCategory(info);
    return updatedCategory;
  }

  async deleteStatusCategory(info: Prisma.CategoryWhereUniqueInput) {
    const exist = await this.categoryRepo.findOneCategory(info);
    if (!exist)
      throw new BadRequestException(baseResponeStatus.CATEGORY_NOT_EXIST);

    const deletedCategory = await this.categoryRepo.deleteStatusCategory(info);
    return deletedCategory;
  }
}
