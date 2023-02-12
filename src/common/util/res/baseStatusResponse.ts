//   is_success: boolean;
//   code?: number;
//   message: string;
// }
// interface ResErr {
//   [index: string]: ErrObj;

import { INDEX, RESCODE, RES_ERR_CODE } from './BaseResponseIndex';

const { AUTH, USER, ARCHIVE, CATEGORY, PRODUCT, CART } = INDEX;
const { EXIST, NOT_EXIST, FAILURE, EXPIRED, NOT_AUTHORIZED, INVALID } =
  RES_ERR_CODE;
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

  ARCHIVE_NOT_EXIST: {
    is_success: false,
    code: RESCODE + ARCHIVE + NOT_EXIST,
    message: '존재하지 않는 아카이브입니다.',
  },
  ARCHIVE_EXIST: {
    is_success: false,
    code: RESCODE + ARCHIVE + EXIST,
    message: '이미 존재하는 아카이브입니다.',
  },

  CATEGORY_NOT_EXIST: {
    is_success: false,
    code: RESCODE + CATEGORY + NOT_EXIST,
    message: '존재하지 않는 카테고리입니다.',
  },
  CATEGORY_EXIST: {
    is_success: false,
    code: RESCODE + CATEGORY + EXIST,
    message: '이미 존재하는 카테고리입니다.',
  },
  CATEGORY_INVALID: {
    is_success: false,
    code: RESCODE + CATEGORY + INVALID,
    message: '유효하지않은 카테고리 정보입니다.',
  },

  PRODUCT_NOT_EXIST: {
    is_success: false,
    code: RESCODE + PRODUCT + NOT_EXIST,
    message: '존재하지 않는 상품입니다.',
  },
  QUESTION_NOT_EXIST: {
    is_success: false,
    code: RESCODE + ARCHIVE + NOT_EXIST,
    message: '존재하지 않는 질문입니다.',
  },
  QUESTION_EXIST: {
    is_success: false,
    code: RESCODE + ARCHIVE + EXIST,
    message: '이미 존재하는 질문입니다.',
  },

  CART_PRODUCT_NOT_EXIST: {
    is_success: false,
    code: RESCODE + CART + NOT_EXIST,
    message: '장바구니에 존재하지않는 상품입니다.',
  },
  CART_PRODUCT_EXIST: {
    is_success: false,
    code: RESCODE + CART + EXIST,
    message: '장바구니에 이미 존재하는 상품입니다.',
  },

  CART_PRODUCT_INVALID: {
    is_success: false,
    code: RESCODE + CART + INVALID,
    message: '유효하지않는 접근입니다',
  },
};
