import { BadRequestException, Injectable } from '@nestjs/common';
import { baseResponeStatus } from './../../common/util/res/baseStatusResponse';
import { CategoryCreateInputDTO } from './../dto/create_category.dto';
import { CategoryRepository } from './category.repository';
@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async createCategory(info: CategoryCreateInputDTO) {
    const exist = await this.categoryRepo.findOneCategory(info);
    console.log(exist);
    if (exist) throw new BadRequestException(baseResponeStatus.CATEGORY_EXIST);

    const newCategory = await this.categoryRepo.createCategory(info);

    return newCategory;
  }
}
