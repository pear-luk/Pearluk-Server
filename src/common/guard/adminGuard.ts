import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { baseResponeStatus } from '../util/res/baseStatusResponse';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    // const req = ctx.switchToHttp().getRequest();

    const { admin } = req.user;

    if (admin !== 1) {
      throw new UnauthorizedException(baseResponeStatus.AUTH_NOT_AUTHORIZED);
    }
    return true;
  }
}
