import { Module } from '@nestjs/common';
import { UserRopository } from './provider/user.ropository';

@Module({
  imports: [],
  controllers: [],
  providers: [UserRopository],
  exports: [UserRopository],
})
export class UserModule {}
