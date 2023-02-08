import { UserRole } from '@prisma/client';

export class CurrentUserDTO {
  email: string;
  user_id: string;
  nickname: string;
  role: UserRole;
}
