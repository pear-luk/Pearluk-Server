import { Module } from '@nestjs/common';
import { LoginController } from './controller/login.contoller';
import { SignupController } from './controller/signup.controller';
import { LoginService } from './provider/login.service';
import { SignupService } from './provider/signup.service';

@Module({
  imports: [],
  controllers: [LoginController, SignupController],
  providers: [LoginService, SignupService],
})
export class LoginModule {}
