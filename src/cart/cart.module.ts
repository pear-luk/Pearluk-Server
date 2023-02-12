import { Module } from '@nestjs/common';
import { ProductModule } from './../product/product.module';
import { CartController } from './cart.controller';
import { CartRepository } from './provider/cart.repository';
import { CartService } from './provider/cart.service';

@Module({
  imports: [ProductModule],
  providers: [CartService, CartRepository],
  controllers: [CartController],
  exports: [],
})
export class CartModule {}
