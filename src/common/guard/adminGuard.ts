import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { baseResponeStatus } from '../util/res/baseStatusResponse';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    // const req = ctx.switchToHttp().getRequest();

    const { role } = req.user;

    if (role === UserRole.user) {
      throw new UnauthorizedException(baseResponeStatus.AUTH_NOT_AUTHORIZED);
    }
    return true;
  }
}
