import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OrderConfirmDTO } from '../dto/confirm_order.dto';
import { CurrentUserDTO } from './../../user/dto/current_user.dto';
import { OrderCreateInputDTO } from './../dto/create_order.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

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

  async confirmOrder(orderConfirmDTO: OrderConfirmDTO) {
    const { order_id, payment_key, amount } = orderConfirmDTO;

    const order = await this.orderRepo.getOrder({ order_id });
    if (Number(order.total_price) !== amount) {
      throw new BadRequestException('돈안맞자나!!!');
    }
    /**
     * confirm이 에러가 날시.
     * 1. order의 status를 INACTIVE로 변환
     * 2. order_status -> 주문실패
     *
     *
     * confirm성공 할시
     * 1. payment_info 생성.
     * 2.
     */

    const confirm = await this.httpService.axiosRef.post(
      'https://api.tosspayments.com/v1/payments/confirm',
      {
        orderId: order_id,
        paymentKey: payment_key,
        amount,
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            String(this.configService.get('TOSS_SECRET_KEY')) + ':',
          ).toString('base64')}`,
        },
      },
    );

    if (!confirm) {
      throw new BadRequestException('결제 승인 에러');
    }
    const {
      method,
      status: payment_status,
    }: { method: string; status: string } = confirm.data;
    console.log(confirm.data);

    // return await this.orderRepo.createOrderPaymentInfo({
    //   order_id,
    //   key: payment_key,
    //   method,
    //   payment_status,
    // });
  }
}
