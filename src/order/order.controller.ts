import { Controller } from '@nestjs/common';
import { OrderService } from './provider/order.service';

@Controller('/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
}
