import { Module } from '@nestjs/common';
import { MyController } from './controller/my.controller';
import { UserService } from './provider/user.service';
import { UserRepository } from './provider/user.repository';

@Module({
  imports: [],
  controllers: [MyController],
  providers: [UserRepository, UserService],
  exports: [UserRepository, UserService],
})
export class UserModule {}
