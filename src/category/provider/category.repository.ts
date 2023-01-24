import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ulid } from 'ulid';
import { PrismaService } from './../../prisma/prisma.service';
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
      where: info,
    });

    return category;
  }
}
