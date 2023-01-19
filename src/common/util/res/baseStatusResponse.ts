//   is_success: boolean;
//   code?: number;
//   message: string;
// }
// interface ResErr {
//   [index: string]: ErrObj;

import { INDEX, RESCODE, RES_ERR_CODE } from './BaseResponseIndex';

const { AUTH, USER } = INDEX;
const { EXIST, NOT_EXIST, FAILURE } = RES_ERR_CODE;
export const baseResponeStatus = {
  SUCCESS: { is_success: true, code: 1000000, message: '성공' },

  OAUTH_TOKEN_FAILURE: {
    is_success: false,
    code: RESCODE + AUTH + FAILURE,
    message: '소셜 인증 실패',
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
};
