import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderRepository } from './provider/order.repository';
import { OrderService } from './provider/order.service';

@Module({
  imports: [],
  providers: [OrderService, OrderRepository],
  controllers: [OrderController],
  exports: [],
})
export class OrderModule {}
