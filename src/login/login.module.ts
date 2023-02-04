import { Module } from '@nestjs/common';
import { AuthModule } from './../auth/auth.module';
import { UserModule } from './../user/user.module';
import { LoginController } from './controller/login.contoller';
import { LogoutController } from './controller/logout.controller';
import { SignupController } from './controller/signup.controller';
import { LoginService } from './provider/login.service';
import { SignupService } from './provider/signup.service';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [LoginController, SignupController, LogoutController],
  providers: [LoginService, SignupService],
})
export class LoginModule {}
