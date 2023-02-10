import { Injectable } from '@nestjs/common';
import { CurrentUserDTO } from '../dto/current_user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async getMyInfo(user: CurrentUserDTO) {
    return await this.userRepo.getUserInfoWithAddress(user);
  }
}
