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
  CategoryCreateInputDTO,
  CategoryCreateResponseEX,
} from './dto/create_category.dto';
import { CategoryUpdateInputDTO } from './dto/update_category.dto';
import { CategoryService } from './provider/category.service';
@ApiTags('Category API')
@ApiExtraModels(CategoryCreateInputDTO, CategoryUpdateInputDTO)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    summary: '카테고리 생성 API',
    description: `
      카테고리 생성 API 입니다.
      
      필요한 데이터 
      - name : 카테고리 이름 - String 
      - parent_category_id ?: 부모 카테고리 id - String ULID
    
      - 주의상황
        - 부모카테고리는 최상위 카테고리여야 합니다. (depth 2까지만 지원)
          추후 v2에서 여러 depth를 지원할 예정입니다.    
    `,
  })
  @ApiBody({
    schema: { $ref: getSchemaPath(CategoryCreateInputDTO) },
    examples: {
      NO_PARENT: {
        description: '부모 카테고리가 없는 카테고리 생성',
        value: {
          name: 'ring',
        },
      },
      PARENT: {
        description: '부모 카테고리가 있는 카테고리 생성',
        value: {
          name: "Man's Top",
          parent_category_id: '01GQJ0MA8FC3RFDZ0X3R793MRK',
        },
      },
    },
  })
  @ApiResponseDTO(
    201,
    new BaseResponse(baseResponeStatus.SUCCESS, CategoryCreateResponseEX),
    'SUCCESS',
  )
  @ApiResponseDTO(
    400.3,
    baseResponeStatus.CATEGORY_INVALID,
    '부모 카테고리가 최상위 카테고리가 아닐때',
  )
  @ApiResponseDTO(
    400.2,
    baseResponeStatus.CATEGORY_NOT_EXIST,
    '부모 카테고리가 존재하지않을때',
  )
  @ApiResponseDTO(
    400.1,
    baseResponeStatus.CATEGORY_EXIST,
    '이미 존재하는 카테고리 이름일경우(다른부모에서는 상관없음)',
  )
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

  @ApiOperation({
    summary: '카테고리 업데이트 API',
    description: `
      카테고리 업데이트 API 입니다.
      
      필요한 데이터 
      - name ?: 카테고리 이름 - String 
      - parent_category_id ?: 부모 카테고리 id - String ULID
    
      - 주의상황
        - 부모카테고리는 최상위 카테고리여야 합니다. (depth 2까지만 지원)
          추후 v2에서 여러 depth를 지원할 예정입니다.    
    `,
  })
  @ApiBody({
    schema: { $ref: getSchemaPath(CategoryUpdateInputDTO) },
    examples: {
      NAME_UPDATE: {
        description: '카테고리 이름만 변경',
        value: {
          name: 'ring',
        },
      },
      PARENT_UPDATE: {
        description: '부모 카테고리가 있는 카테고리 생성',
        value: {
          parent_category_id: '01GQJ0MA8FC3RFDZ0X3R793MRK',
        },
      },
      PARENT_AND_NAME_UPDATE: {
        description: '부모 카테고리가 있는 카테고리 생성',
        value: {
          name: "Man's Top",
          parent_category_id: '01GQJ0MA8FC3RFDZ0X3R793MRK',
        },
      },
    },
  })
  @ApiParam({
    name: 'category_id',
    example: '01GQHV3WVK21Q60C1DTAPH99HJ',
    description: '카테고리 id - Stirng - ULID',
  })
  @ApiResponseDTO(
    201,
    new BaseResponse(baseResponeStatus.SUCCESS, CategoryCreateResponseEX),
    'SUCCESS',
  )
  @ApiResponseDTO(
    400.5,
    baseResponeStatus.CATEGORY_INVALID,
    '카테고리 id와 카테고리 부모 id가 같을 때',
  )
  @ApiResponseDTO(
    400.4,
    baseResponeStatus.CATEGORY_INVALID,
    '부모 카테고리가 최상위 카테고리가 아닐때',
  )
  @ApiResponseDTO(
    400.3,
    baseResponeStatus.CATEGORY_NOT_EXIST,
    '부모 카테고리가 존재하지않을때',
  )
  @ApiResponseDTO(
    400.2,
    baseResponeStatus.CATEGORY_NOT_EXIST,
    '해당 카테고리가 존재하지않을때',
  )
  @ApiResponseDTO(
    400.1,
    baseResponeStatus.CATEGORY_EXIST,
    '이미 존재하는 카테고리 이름일경우(다른부모에서는 상관없음)',
  )
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

  @ApiOperation({
    summary: '카테고리 삭제 API',
    description: `
      카테고리 삭제 API 입니다.   
    `,
  })
  @ApiResponseDTO(
    200,
    new BaseResponse(baseResponeStatus.SUCCESS, {
      ...CategoryCreateResponseEX,
      status: E_status.DELETED,
    }),
    'SUCCESS',
  )
  @ApiParam({
    name: 'category_id',
    example: '01GQHV3WVK21Q60C1DTAPH99HJ',
    description: '카테고리 id - Stirng - ULID',
  })
  @ApiResponseDTO(
    400.1,
    baseResponeStatus.CATEGORY_NOT_EXIST,
    '해당 카테고리가 존재하지 않을경우',
  )
  @Put('/:category_id')
  @UseGuards(JwtAccessAuthGuard, AdminAuthGuard)
  async deleteStatusCategory(@Param('category_id') category_id) {
    return this.categoryService.deleteStatusCategory({ category_id });
  }
}
