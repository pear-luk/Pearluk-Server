import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BaseResponse } from 'src/common/util/res/BaseResponse';
import { CurrentUser } from '../common/decorator/current-user.decorator';
import { baseResponeStatus } from '../common/util/res/baseStatusResponse';
import { DevGuard } from './../common/guard/devGuard';
import { CurrentUserDTO } from './../user/dto/current_user.dto';
import { CartProductCreateInputDTO } from './dto/create_cart_product.dto';
import { CartProductUpdateInputDTO } from './dto/update_cart_product.dto';
import { CartService } from './provider/cart.service';

@Controller('/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/')
  @UseGuards(DevGuard)
  async getCartProductList(@CurrentUser() user: CurrentUserDTO) {
    const result = await this.cartService.getCartProductList(user.user_id);
    console.log(result);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Post('/')
  @UseGuards(DevGuard)
  async createCartProduct(
    @CurrentUser() user: CurrentUserDTO,
    @Body() cartProductCreateInputDTO: CartProductCreateInputDTO,
  ) {
    const result = await this.cartService.createCartProduct({
      ...cartProductCreateInputDTO,
      user_id: user.user_id,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Patch('/')
  @UseGuards(DevGuard)
  async updateCartProduct(
    @CurrentUser() user: CurrentUserDTO,
    @Body() cartProductUpdateInputDTO: CartProductUpdateInputDTO,
  ) {
    const result = await this.cartService.updateCartProduct({
      ...cartProductUpdateInputDTO,
      user_id: user.user_id,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Put('/:cart_product_id')
  @UseGuards(DevGuard)
  async deleteStatusCartProduct(
    @CurrentUser() user: CurrentUserDTO,
    @Param('cart_product_id') cart_product_id: string,
  ) {
    const result = await this.cartService.deleteCartProduct({
      cart_product_id,
      user_id: user.user_id,
    });
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
