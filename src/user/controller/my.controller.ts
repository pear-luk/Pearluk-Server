import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/util/res/BaseResponse';
import { CurrentUser } from '../../common/decorator/current-user.decorator';
import { DevGuard } from '../../common/guard/devGuard';
import { UserService } from '../provider/user.service';
import { baseResponeStatus } from './../../common/util/res/baseStatusResponse';
import { CurrentUserDTO } from './../dto/current_user.dto';

@ApiTags('My API')
@Controller('my')
export class MyController {
  constructor(private readonly uesrService: UserService) {}

  @Get('/')
  //   @UseGuards(JwtAccessAuthGuard)
  @UseGuards(DevGuard)
  async getMyInfo(@CurrentUser() user: CurrentUserDTO) {
    const result = await this.uesrService.getMyInfo(user);
    console.log(result);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
