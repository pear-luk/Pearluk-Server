import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BaseResponse } from '../common/util/res/BaseResponse';
import { CurrentUserDTO } from '../user/dto/current_user.dto';
import { CurrentUser } from './../common/decorator/current-user.decorator';
import { DevGuard } from './../common/guard/devGuard';
import { baseResponeStatus } from './../common/util/res/baseStatusResponse';
import { OrderCreateInputDTO } from './dto/create_order.dto';
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
    const result = await this.orderService.getMyOrderListAllInfo(user);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Post('/')
  @UseGuards(DevGuard)
  async createOrder(
    @CurrentUser()
    user: CurrentUserDTO,
    @Body() orderCreateInputDTO: OrderCreateInputDTO,
  ) {
    const result = await this.orderService.createOrder({
      user,
      order_info: orderCreateInputDTO,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
