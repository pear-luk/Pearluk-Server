import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResponse } from '../util/res/BaseResponse';

import { baseResponeStatus } from '../util/res/baseStatusResponse';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const status_code = context.switchToHttp().getResponse().statusCode;
    return next.handle().pipe(
      map((data) => {
        if (data instanceof BaseResponse) {
          return { ...data, status_code };
        } else {
          return {
            is_success: baseResponeStatus.SUCCESS.is_success,
            message: baseResponeStatus.SUCCESS.message,
            code: baseResponeStatus.SUCCESS.code,
            result: data,
            status_code,
          };
        }
      }),
    );
  }
}
