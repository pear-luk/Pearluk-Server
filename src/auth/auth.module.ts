import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessStrategy } from './../common/guard/JWT/jwt.strategy';
import { UserModule } from './../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './provider/auth.service';
import { OauthService } from './provider/oauth.service';

@Module({
  imports: [JwtModule, UserModule, HttpModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, OauthService, JwtAccessStrategy],
  exports: [AuthService, OauthService, JwtAccessStrategy],
})
export class AuthModule {}
