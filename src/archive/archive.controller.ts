import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminAuthGuard } from './../common/guard/adminGuard';
import { JwtAccessAuthGuard } from './../common/guard/JWT/jwt.guard';
import { BaseResponse } from './../common/util/res/BaseResponse';
import { baseResponeStatus } from './../common/util/res/baseStatusResponse';
import {
  ArchiveCreateInputDTO,
  ArchiveCreateResponseEX,
} from './dto/create_archive.dto';
import {
  ArchiveDeleteResponseEX,
  ArchiveUpdateInputDTO,
  ArchiveUpdateResponseEX,
} from './dto/update_archive.dto';

import { ArchiveService } from './provider/archive.service';

@ApiTags('Archive API')
@Controller('archives')
export class ArchiveController {
  constructor(private readonly archiveService: ArchiveService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: '아카이브 생성 API',
    description: `
      아카이브 생성 API입니다.
      관리자만 접근이 가능합니다.

      필요한 정보
      - title : 아카이브 이름 String
      - year : 아카이브 해당 년도 Int
      - introduce ?: 아카이브 소개 String 
    `,
  })
  @ApiResponse({
    status: 201,
    description: 'SUCCESS',
    schema: {
      example: new BaseResponse(
        baseResponeStatus.SUCCESS,
        ArchiveCreateResponseEX,
      ),
    },
  })
  @ApiBadRequestResponse({
    description: '이미 존재하는 아카이브 이름',
    schema: {
      example: baseResponeStatus.ARCHIVE_EXIST,
    },
  })
  @Post('/')
  @UseGuards(JwtAccessAuthGuard, AdminAuthGuard)
  async creatArchive(@Body() archiveInputDTO: ArchiveCreateInputDTO) {
    const result = await this.archiveService.createArchive(archiveInputDTO);

    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: '아카이브 수정 API',
    description: `
      아카이브 업데이트 API입니다.
      관리자만 접근이 가능합니다.
    
      params
      archive_id : 아카이브 id String (ULID)
    
      업데이트할 정보만 입력합니다.
      - title ?: 아카이브 이름 String
      - year ?: 아카이브 해당 년도 Int (2000~현재년도+1)
      - introduce ?: 아카이브 소개 String 

    `,
  })
  @ApiParam({
    name: 'archive_id',
    description: '아카이브 id - String ULID',
    type: 'string',
    example: ArchiveUpdateResponseEX.archive_id,
  })
  @ApiResponse({
    status: 200,
    description: 'SUCCESS',
    schema: {
      example: new BaseResponse(
        baseResponeStatus.SUCCESS,
        ArchiveUpdateResponseEX,
      ),
    },
  })
  @ApiResponse({
    status: 400.2,
    description: '이미 존재하는 타이틀',
    schema: {
      example: baseResponeStatus.ARCHIVE_EXIST,
    },
  })
  @ApiResponse({
    status: 400.1,
    description: '존재하지 않는 아카이브',
    schema: {
      example: baseResponeStatus.ARCHIVE_NOT_EXIST,
    },
  })
  @Patch('/:archive_id')
  @UseGuards(JwtAccessAuthGuard, AdminAuthGuard)
  async updateArchive(
    @Body() archiveUpdateInputDTO: ArchiveUpdateInputDTO,
    @Param('archive_id') archive_id,
  ) {
    console.log(archive_id);
    const result = await this.archiveService.updateArchive({
      archive_id,
      ...archiveUpdateInputDTO,
    });

    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: '아카이브 삭제 API',
    description: `
      아카이브 삭제 API입니다.
      관리자만 접근이 가능합니다.
    
      params
      archive_id : 아카이브 id String (ULID)
    
    `,
  })
  @ApiParam({
    name: 'archive_id',
    description: '아카이브 id - String ULID',
    type: 'string',
    example: ArchiveUpdateResponseEX.archive_id,
  })
  @ApiResponse({
    status: 200,
    description: 'SUCCESS',
    schema: {
      example: new BaseResponse(
        baseResponeStatus.SUCCESS,
        ArchiveDeleteResponseEX,
      ),
    },
  })
  @ApiResponse({
    status: 400.1,
    description: '존재하지 않는 아카이브',
    schema: {
      example: baseResponeStatus.ARCHIVE_NOT_EXIST,
    },
  })
  @Put('/:archive_id')
  @UseGuards(JwtAccessAuthGuard, AdminAuthGuard)
  async deleteStatusArchive(@Param('archive_id') archive_id) {
    const result = await this.archiveService.deleteStatusArchive({
      archive_id,
    });

    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
