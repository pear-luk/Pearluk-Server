import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { baseResponeStatus } from '../../util/res/baseStatusResponse';

@Injectable()
export class JwtAccessAuthGuard extends AuthGuard('JWT-ACCESS-TOKEN') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    // try {
    if (err) {
      throw new UnauthorizedException(err.response);
    }
    if (!user) {
      throw new UnauthorizedException(
        baseResponeStatus.AUTH_ACCESS_TOKEN_FAILURE,
      );
    }

    return user;
    // } catch (err) {
    //   console.log(err);
    // }
  }
}
