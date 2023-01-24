import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard } from './../common/guard/adminGuard';
import { JwtAccessAuthGuard } from './../common/guard/JWT/jwt.guard';
import { BaseResponse } from './../common/util/res/BaseResponse';
import { baseResponeStatus } from './../common/util/res/baseStatusResponse';
import { CategoryCreateInputDTO } from './dto/create_category.dto';
import { CategoryUpdateInputDTO } from './dto/update_category.dto';
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

  @Get('/')
  @UseGuards(JwtAccessAuthGuard, AdminAuthGuard)
  async getCategoryList() {
    const result = await this.categoryService.getCategoryList();
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Patch('/:category_id')
  @UseGuards(JwtAccessAuthGuard, AdminAuthGuard)
  async updateCategory(
    @Param('category_id') category_id,
    @Body() categoryUpdateInputDTO: CategoryUpdateInputDTO,
  ) {
    const result = await this.categoryService.updateCategory({
      category_id,
      ...categoryUpdateInputDTO,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Put('/:category_id')
  @UseGuards(JwtAccessAuthGuard, AdminAuthGuard)
  async deleteStatusCategory(@Param('category_id') category_id) {
    return this.categoryService.deleteStatusCategory({ category_id });
  }
}
