import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './provider/order.service';

@Module({
  imports: [],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [],
})
export class OrderModule {}
