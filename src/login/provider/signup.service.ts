import { Body, Injectable } from '@nestjs/common';

@Injectable()
export class SignupService {
  constructor() {}

  async localSignup(@Body() body) {}

  async kakaoSignup(@Body() body) {}
}
