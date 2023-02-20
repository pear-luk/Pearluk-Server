import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { IsULID } from '../../common/decorator/IsULID';

export class OrderConfirmDTO {
  @IsString()
  payment_key: string;

  @IsNumber()
  @Type(() => Number)
  amount: number;

  @IsULID()
  order_id: string;
}
