import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CurrentUserDTO } from './../../user/dto/current_user.dto';

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
        order_products: {
          select: {
            product_id: true,
            count: true,
            price: true,

            product: {
              select: {
                name: true,
                price: true,
                // imgs:true
              },
            },
          },
        },
      },

      where: { user_id },
    });
  }
}
