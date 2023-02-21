import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ulid } from 'ulid';
import { CurrentUserDTO } from './../../user/dto/current_user.dto';
import { OrderCreateInputDTO } from './../dto/create_order.dto';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getMyOrderListAllInfo({ user_id }: CurrentUserDTO) {
    const OrderList = await this.prisma.order.findMany({
      select: {
        order_id: true,
        name: true,
        user_id: true,
        total_price: true,
        order_status: true,
        payment_status: true,

        order_products: {
          select: {
            product_id: true,
            count: true,
            price: true,
            use_coupon: true,
            product: {
              select: {
                name: true,
                price: true,
                imgs: true,
              },
            },
          },
        },

        shipping: {
          select: {
            courier_id: true,
            courier_name: true,
            waybill_number: true,
            shipping_status: true,
          },
        },

        created_at: true,
      },

      where: { user_id },
    });

    return OrderList;
  }

  async createOrder({
    user,
    order_info,
  }: {
    user: CurrentUserDTO;
    order_info: OrderCreateInputDTO;
  }) {
    const { user_id } = user;
    const {
      name,
      total_price,
      order_status,
      payment_status,
      order_products,
      customer_info,
      recipient_info,
      payment_info,
    } = order_info;

    const order_id = ulid();
    const order_product_list = order_products.map((product) => ({
      order_product_id: ulid(),
      ...product,
    }));
    // console.log(order_product_list);
    const newOrder = await this.prisma.order.create({
      data: {
        order_id,
        user_id,
        name,
        total_price,
        order_status,
        payment_status,
        order_products: {
          createMany: {
            data: order_product_list,
          },
        },
        customer_info: {
          create: { ...customer_info },
        },
        recipient_info: {
          create: recipient_info,
        },
        payment_info: {
          create: payment_info,
        },
        // ...order_info,
      },
    });
    return newOrder;
  }

  async getOrder(info: Partial<Prisma.OrderWhereInput>) {
    return await this.prisma.order.findFirst({ where: info });
  }

  async createOrderPaymentInfo(info: Prisma.PaymentInfoUncheckedCreateInput) {
    return await this.prisma.paymentInfo.create({
      data: info,
    });
  }

  async getPaymentInfo(info: Prisma.PaymentInfoWhereInput) {
    return this.prisma.paymentInfo.findFirst({
      where: info,
    });
  }

  async updatePaymentStatus(
    info: Partial<Prisma.PaymentInfoUncheckedCreateInput>,
  ) {
    const { order_id, payment_status, transaction_key } = info;
    return await this.prisma.paymentInfo.update({
      data: { payment_status, transaction_key },
      where: { order_id },
    });
  }
}
