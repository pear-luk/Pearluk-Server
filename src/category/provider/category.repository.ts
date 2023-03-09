import { Injectable } from '@nestjs/common';
import { E_status, Prisma } from '@prisma/client';
import { ulid } from 'ulid';
import { PrismaService } from './../../prisma/prisma.service';
import { CategoryUpdateInputDTO } from './../dto/update_category.dto';
@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(info: Omit<Prisma.CategoryCreateInput, 'category_id'>) {
    const newCategory = await this.prisma.category.create({
      data: {
        category_id: ulid(),
        ...info,
      },
    });
    return newCategory;
  }

  async findOneCategory(info: Prisma.CategoryWhereInput) {
    const category = await this.prisma.category.findFirst({
      select: {
        category_id: true,
        name: true,
        status: true,
        parent_category_id: true,
        child_categories: {
          select: {
            category_id: true,
            name: true,
            status: true,
          },
          where: {
            status: E_status.ACTIVE,
          },
        },
      },
      where: info,
    });

    return category;
  }

  async updateCategory(
    info: CategoryUpdateInputDTO & Prisma.CategoryWhereUniqueInput,
  ) {
    const { category_id, ...data } = info;
    const updatedCategory = await this.prisma.category.update({
      where: { category_id },
      data,
    });
    return updatedCategory;
  }

  async getCategoryList() {
    const categories = await this.prisma.category.findMany({
      select: {
        category_id: true,
        name: true,
        status: true,
        child_categories: {
          select: {
            category_id: true,
            name: true,
            status: true,
          },
          where: {
            status: E_status.ACTIVE,
          },
        },
      },
      where: {
        status: E_status.ACTIVE,
        parent_category_id: null,
      },
    });
    categories
      .filter((a) => a.child_categories.length > 0)
      .forEach((a) => console.log(a.child_categories));
    return categories;
  }

  async deleteStatusCategory(info: Prisma.CategoryWhereUniqueInput) {
    const deletedCategory = await this.prisma.category.update({
      where: info,
      data: { status: E_status.DELETED },
    });
    return deletedCategory;
  }
}
