import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorator/current-user.decorator';
import { JwtAccessAuthGuard } from '../common/guard/JWT/jwt.guard';
import { Payload } from './dto/payload.dto';

@Controller('/auth')
export class AuthController {
  //로그인 상태 리턴.
  @Get('/')
  @UseGuards(JwtAccessAuthGuard)
  async getLoginStatus(@CurrentUser() user: Payload) {
    console.log(user);
    

    
  }
}
