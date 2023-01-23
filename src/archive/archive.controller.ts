import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorator/current-user.decorator';
import { AdminAuthGuard } from './../common/guard/adminGuard';
import { JwtAccessAuthGuard } from './../common/guard/JWT/jwt.guard';
import { BaseResponse } from './../common/util/res/BaseResponse';
import { baseResponeStatus } from './../common/util/res/baseStatusResponse';
import { ArchiveInputDTO } from './dto/create_archive.dto';
import { ArchiveService } from './provider/archive.service';

@Controller('archives')
export class ArchiveController {
  constructor(private readonly archiveService: ArchiveService) {}

  @Post('/')
  @UseGuards(JwtAccessAuthGuard, AdminAuthGuard)
  async creatArchive(
    @Body() archiveInputDTO: ArchiveInputDTO,
    @CurrentUser() user,
  ) {
    const result = await this.archiveService.createArchive(archiveInputDTO);

    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
