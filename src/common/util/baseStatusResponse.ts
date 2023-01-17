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
};
