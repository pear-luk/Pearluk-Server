import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorator/current-user.decorator';
import { AdminAuthGuard } from './../common/guard/adminGuard';
import { JwtAccessAuthGuard } from './../common/guard/JWT/jwt.guard';
import { ArchiveInputDTO } from './dto/create_archive.dto';

@Controller('archives')
export class ArchiveController {
  @Post('/')
  @UseGuards(JwtAccessAuthGuard, AdminAuthGuard)
  async creatArchive(
    @Body() archiveInputDTO: ArchiveInputDTO,
    @CurrentUser() user,
  ) {
    console.log(archiveInputDTO);
  }
}
