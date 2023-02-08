import { Injectable } from '@nestjs/common';
import { CurrentUserDTO } from './../dto/current_user.dto';
import { UserRopository } from './user.ropository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRopository) {}

  async getMyInfo(user: CurrentUserDTO) {
    const userInfo = await this.userRepo;
  }
}
