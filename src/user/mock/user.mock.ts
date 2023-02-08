import { UserRole } from '@prisma/client';

export const devUserDevGaurdMock: {
  email: string;
  user_id: string;
  nickname: string;
  role: UserRole;
} = {
  user_id: '01GRHG8YXFWVHZ6272EZPGXRD9',
  nickname: '박준혁',
  role: 'developer',
  email: 'vo0v0000@naver.com',
};
export const userUserDevGaurdMock: {
  email: string;
  user_id: string;
  nickname: string;
  role: UserRole;
} = {
  user_id: '01GRHG8YXFWVHZ6272EZPGXRD9',
  nickname: '박준혁',
  role: 'user',
  email: 'vo0v0000@naver.com',
};
