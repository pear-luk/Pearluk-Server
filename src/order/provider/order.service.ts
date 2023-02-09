import { Injectable } from '@nestjs/common';
import { CurrentUserDTO } from './../../user/dto/current_user.dto';
import { OrderCreateInputDTO } from './../dto/create_order.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepo: OrderRepository) {}

  async getMyOrderListAllInfo(user: CurrentUserDTO) {
    return await this.orderRepo.getMyOrderListAllInfo(user);
  }

  async createOrder({
    user,
    order_info,
  }: {
    user: CurrentUserDTO;
    order_info: OrderCreateInputDTO;
  }) {
    try {
      const newOrder = await this.orderRepo.createOrder({
        user,
        order_info,
      });

      return newOrder;
    } catch (e) {
      console.log(e);
    }
  }
}
