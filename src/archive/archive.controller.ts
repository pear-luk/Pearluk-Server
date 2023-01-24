import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../common/decorator/current-user.decorator';
import { AdminAuthGuard } from './../common/guard/adminGuard';
import { JwtAccessAuthGuard } from './../common/guard/JWT/jwt.guard';
import { BaseResponse } from './../common/util/res/BaseResponse';
import { baseResponeStatus } from './../common/util/res/baseStatusResponse';
import { ArchiveCreateInputDTO } from './dto/create_archive.dto';
import { ArchiveUpdateInputDTO } from './dto/update_archive.dto';

import { ArchiveService } from './provider/archive.service';

@Controller('archives')
export class ArchiveController {
  constructor(private readonly archiveService: ArchiveService) {}

  @Post('/')
  @UseGuards(JwtAccessAuthGuard, AdminAuthGuard)
  async creatArchive(
    @Body() archiveInputDTO: ArchiveCreateInputDTO,
    @CurrentUser() user,
  ) {
    const result = await this.archiveService.createArchive(archiveInputDTO);

    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

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
}
