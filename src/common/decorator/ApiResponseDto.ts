import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { BaseResponse } from '../util/res/BaseResponse';

export const ApiResponseDto = <T extends Type<any>>(data: T, type?: string) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseResponse<T>) },
          {
            properties: {
              is_success: { type: 'boolean', example: true },
              message: { type: 'string', example: '성공' },
              code: { type: 'number', example: 100000 },
              status_code: { type: 'number' },
              result:
                type === 'array'
                  ? {
                      type: 'array',
                      items: { $ref: getSchemaPath(data) },
                    }
                  : {
                      type: typeof new data(),
                      $ref: getSchemaPath(data),
                    },
            },
          },
        ],
      },
    }),
  );
};
// result: {
//   type: isarray ? 'array' : typeof new data(),
//   $ref: getSchemaPath(data),
// },
