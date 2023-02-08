import { Injectable } from '@nestjs/common';
import { CurrentUserDTO } from './../../user/dto/current_user.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepo: OrderRepository) {}

  async getMyOrderListAllInfo(user: CurrentUserDTO) {}
}
