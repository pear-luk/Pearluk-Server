import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BaseResponse } from '../common/util/res/BaseResponse';
import { CurrentUserDTO } from '../user/dto/current_user.dto';
import { CurrentUser } from './../common/decorator/current-user.decorator';
import { DevGuard } from './../common/guard/devGuard';
import { baseResponeStatus } from './../common/util/res/baseStatusResponse';
import { OrderCreateInputDTO } from './dto/create_order.dto';
import { order_mock } from './mock/index';
import { OrderService } from './provider/order.service';

@Controller('/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/')
  @UseGuards(DevGuard)
  async getMyOrderList(
    @CurrentUser()
    user: CurrentUserDTO,
  ) {

    return new BaseResponse(baseResponeStatus.SUCCESS);
  }

  @Post('/')
  async createOrder(@Body() orderCreateInputDTO: OrderCreateInputDTO) {
    // console.log(orderCreateInputDTO);

    return order_mock;
  }
}
