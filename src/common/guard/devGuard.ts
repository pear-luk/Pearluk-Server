import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  devUserDevGaurdMock,
  userUserDevGaurdMock,
} from './../../user/mock/user.mock';

@Injectable()
export class DevGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    // const req = ctx.switchToHttp().getRequest();

    req.user = userUserDevGaurdMock;
    // req.user = devUserDevGaurdMock;

    return true;
  }
}
