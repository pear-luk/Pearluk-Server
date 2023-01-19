import { ApiProperty } from '@nestjs/swagger';
import { baseResponeStatus } from './baseStatusResponse';

export interface IBaseResponse<T> {
  is_success: boolean;
  message: string;
  code?: number;
  result?: T;
}

export class BaseResponse<T> implements IBaseResponse<T> {
  @ApiProperty({ description: '성공여부' })
  readonly is_success: boolean;

  @ApiProperty({ description: '메세지' })
  readonly message: string;

  @ApiProperty({ description: '코드' })
  readonly code?: number;

  @ApiProperty({
    description: '결과',
  })
  readonly result?: T;
  constructor(
    { is_success, message, code }: IBaseResponse<any> = {
      is_success: baseResponeStatus.SUCCESS.is_success,
      message: baseResponeStatus.SUCCESS.message,
      code: baseResponeStatus.SUCCESS.code,
    },
    result?: T,
  ) {
    this.is_success = is_success;
    this.message = message;
    this.code = code;
    this.result = result;
  }
}
