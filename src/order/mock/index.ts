import { PaymentInfoCreateInputDTO } from '../dto/payment/create_payment_info.dto';
import { OrderCreateInputDTO } from './../dto/create_order.dto';
import { CustomerInfoCreateInputDTO } from './../dto/customer/create_customer.dto';
import { OrderProductCreatInputDTO } from './../dto/order_product/create_order_product.dto';
import { RecipientInfoCreateInputDTO } from './../dto/recipient/create_recipient_info.dto';

export const payment_info_mock: PaymentInfoCreateInputDTO = {
  key: 'test-test-test',
  method: '카드',
  payment_status: 'DONE',
};

export const order_product_mock: OrderProductCreatInputDTO = {
  product_id: '01GQM00TB1ENRKDW06E994CZ4R',
  count: 2,
  price: 1000000,
};

export const customer_info_mock: CustomerInfoCreateInputDTO = {
  name: '박준혁',
  phone_number: '01073616616',
};

export const recipient_info_mock: RecipientInfoCreateInputDTO = {
  name: '박준혁',
  post_code: '010203',
  phone_number: '01073616616',
  full_address: '서울특별시 광진구 군자동 ooo-oo, xxx호',
  address: '서울특별시 광진구 군자동 ooo-oo',
  detail_address: 'xxx호',
};

export const order_mock: OrderCreateInputDTO = {
  name: '목걸이 외 1개',
  total_price: 9999999,
  order_status: 0,
  payment_status: 0,
  order_products: [order_product_mock, order_product_mock],
  customer_info: customer_info_mock,
  recipient_info: recipient_info_mock,
  payment_info: payment_info_mock,
};
