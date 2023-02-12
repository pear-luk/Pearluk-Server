import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BaseResponse } from 'src/common/util/res/BaseResponse';
import { CurrentUser } from '../common/decorator/current-user.decorator';
import { baseResponeStatus } from '../common/util/res/baseStatusResponse';
import { DevGuard } from './../common/guard/devGuard';
import { CurrentUserDTO } from './../user/dto/current_user.dto';
import { CartProductCreateInputDTO } from './dto/create_cart_product.dto';
import { CartService } from './provider/cart.service';

@Controller('/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Post('/')
  @UseGuards(DevGuard)
  async createCartProduct(
    @CurrentUser() user: CurrentUserDTO,
    @Body() cartProductCreateInputDTO: CartProductCreateInputDTO,
  ) {
    const result = await this.cartService.cartProductCreate({
      ...cartProductCreateInputDTO,
      user_id: user.user_id,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
