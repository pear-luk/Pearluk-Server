import { Payload } from './../../../auth/dto/payload.dto';
export class JwtPayload extends Payload {
  iat?: number;
  exp: number;
}
