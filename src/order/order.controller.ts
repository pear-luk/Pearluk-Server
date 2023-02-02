import { Body, Controller, Post } from '@nestjs/common';
import { OrderCreateInputDTO } from './dto/create_order.dto';
import { order_mock } from './mock/index';
import { OrderService } from './provider/order.service';

@Controller('/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/')
  async createOrder(@Body() orderCreateInputDTO: OrderCreateInputDTO) {
    // console.log(orderCreateInputDTO);

    return order_mock;
  }
}
