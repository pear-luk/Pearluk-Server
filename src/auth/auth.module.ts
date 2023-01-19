import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './provider/auth.service';
import { OauthService } from './provider/oauth.service';

@Module({
  imports: [JwtModule, HttpModule],
  controllers: [AuthController],
  providers: [AuthService, OauthService],
  exports: [AuthService, OauthService],
})
export class AuthModule {}
