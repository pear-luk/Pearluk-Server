//   is_success: boolean;
//   code?: number;
//   message: string;
// }
// interface ResErr {
//   [index: string]: ErrObj;

import { INDEX, RESCODE, RES_ERR_CODE } from './BaseResponseIndex';

const { AUTH, USER, ARCHIVE } = INDEX;
const { EXIST, NOT_EXIST, FAILURE, EXPIRED, NOT_AUTHORIZED } = RES_ERR_CODE;
export const baseResponeStatus = {
  SUCCESS: { is_success: true, code: 1000000, message: '성공' },

  OAUTH_TOKEN_FAILURE: {
    is_success: false,
    code: RESCODE + AUTH + FAILURE,
    message: '소셜 인증 실패',
  },

  AUTH_ACCESS_TOKEN_FAILURE: {
    is_success: false,
    code: RESCODE + AUTH + FAILURE,
    message: 'ACCESS_TOKEN이 유효하지 않습니다.',
  },

  AUTH_NOT_AUTHORIZED: {
    is_success: false,
    code: RESCODE + AUTH + NOT_AUTHORIZED,
    message: '권한이 없습니다.',
  },

  AUTH_ACCESS_TOKEN_EXPIRED: {
    is_success: false,
    code: RESCODE + AUTH + EXPIRED,
    message: 'ACCESS_TOKEN가 만료되었습니다.',
  },

  USER_NOT_EXIST: {
    is_success: false,
    code: RESCODE + USER + NOT_EXIST,
    message: '존재하지 않는 유저입니다.',
  },
  USER_EXIST: {
    is_success: false,
    code: RESCODE + USER + EXIST,
    message: '이미 존재하는 유저입니다.',
  },

  ARCHIVE_EXIST: {
    is_success: false,
    code: RESCODE + ARCHIVE + EXIST,
    message: '이미 존재하는 아카이브입니다.',
  },
};
