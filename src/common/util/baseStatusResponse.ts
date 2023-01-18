export interface IResObj {
  is_success: boolean;
  code?: number;
  message: string;
}

interface IRes {
  [index: string]: IResObj;
}

export const baseResponeStatus: IRes = {
  SUCCESS: { is_success: true, code: 1000000, message: '성공' },
  OAUTH_TOKEN_FAILURE: {
    is_success: false,
    message: '소셜 인증 실패',
  },
};
