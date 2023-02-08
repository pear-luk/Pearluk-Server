import { Module } from '@nestjs/common';
import { MyController } from './controller/my.controller';
import { UserService } from './provider/uesr.service';
import { UserRopository } from './provider/user.ropository';

@Module({
  imports: [],
  controllers: [MyController],
  providers: [UserRopository, UserService],
  exports: [UserRopository, UserService],
})
export class UserModule {}
