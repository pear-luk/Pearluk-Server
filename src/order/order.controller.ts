import { Body, Controller } from '@nestjs/common';
import { OrderCreateInputDTO } from './dto/create_order.dto';
import { OrderService } from './provider/order.service';

@Controller('/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  async createOrder(@Body() orderCreateInputDTO: OrderCreateInputDTO) {
    console.log(orderCreateInputDTO);
  }
}
