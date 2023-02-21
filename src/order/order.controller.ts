import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BaseResponse } from '../common/util/res/BaseResponse';
import { CurrentUserDTO } from '../user/dto/current_user.dto';
import { CurrentUser } from './../common/decorator/current-user.decorator';
import { DevGuard } from './../common/guard/devGuard';
import { baseResponeStatus } from './../common/util/res/baseStatusResponse';
import { OrderConfirmDTO } from './dto/confirm_order.dto';
import { OrderCreateInputDTO } from './dto/create_order.dto';
import { ITossWebHook } from './interface/webhook.interface';
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

  @Post('/confirm')
  async approvalPayment(@Body() orderConfirmDTO: OrderConfirmDTO) {
    await this.orderService.confirmOrder(orderConfirmDTO);
    return new BaseResponse(baseResponeStatus.SUCCESS);
  }

  //토스 측에서 api 요청 보내는 것임 .
  @Post('/status')
  async tossWebHookVirtualAccount(@Body() tossWebHookDTO: ITossWebHook) {
    await this.orderService.updatePaymentInfo(tossWebHookDTO);
    return new BaseResponse(baseResponeStatus.SUCCESS);
  }


  @Get('/:order_id')
  @UseGuards(DevGuard)
  async getOrderDetail(
    @Param('order_id') order_id: string,
    @CurrentUser() user: CurrentUserDTO,
  ) {
    const result = await this.orderService.getOrderDetail({ order_id, user });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

}
