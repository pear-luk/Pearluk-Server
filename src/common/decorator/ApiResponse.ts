import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
interface I_APIResponseDTO<T> {
  status: number;
  example: T;
  description: string;
}
export const ApiResponseDTO = <T>(
  status: number,
  example: T,
  description: string,
) => {
  return applyDecorators(
    ApiResponse({
      status: status,
      description,
      schema: { example: { status_code: Math.floor(status), ...example } },
    }),
  );
};
// result: {
//   type: isarray ? 'array' : typeof new data(),
//   $ref: getSchemaPath(data),
// },
