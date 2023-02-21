import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OrderConfirmDTO } from '../dto/confirm_order.dto';
import { CurrentUserDTO } from './../../user/dto/current_user.dto';
import { OrderCreateInputDTO } from './../dto/create_order.dto';
import { ITossWebHook } from './../interface/webhook.interface';
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
    console.log(confirm.data);

    const {
      method,
      status: payment_status,
      virtualAccount = null,
      secret,
    }: {
      method: string;
      status: string;
      secret?: string;
      virtualAccount?: {
        accountNumber: string;
        bankCode: string;
        dueDate: string;
        expired: boolean;
      };
    } = confirm.data;

    return await this.orderRepo.createOrderPaymentInfo({
      order_id,
      key: payment_key,
      method,
      payment_status,
      account_number: virtualAccount?.accountNumber,
      bank_code: virtualAccount?.bankCode,
      secret,
    });
  }

  async updatePaymentInfo({ orderId, secret, status }: ITossWebHook) {
    const payment = await this.orderRepo.getPaymentInfo({
      order_id: orderId,
      secret,
    });
    if (!payment) {
      throw new BadRequestException('존재하지않는 결제 정보입니다.');
    }

    const updatedPayment = await this.orderRepo.updatePaymentStatus({
      order_id: orderId,
      secret,
      payment_status: status,
    });
    console.log(updatedPayment);
  }
}
