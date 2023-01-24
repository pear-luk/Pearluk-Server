import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard } from './../common/guard/adminGuard';
import { JwtAccessAuthGuard } from './../common/guard/JWT/jwt.guard';
import { BaseResponse } from './../common/util/res/BaseResponse';
import { baseResponeStatus } from './../common/util/res/baseStatusResponse';
import { CategoryCreateInputDTO } from './dto/create_category.dto';
import { CategoryService } from './provider/category.service';
@ApiTags('Category API')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/')
  @UseGuards(JwtAccessAuthGuard, AdminAuthGuard)
  async createCategory(@Body() categoryCreateInputDto: CategoryCreateInputDTO) {
    const result = await this.categoryService.createCategory(
      categoryCreateInputDto,
    );

    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
