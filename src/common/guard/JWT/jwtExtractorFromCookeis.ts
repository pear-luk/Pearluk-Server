import { Request } from 'express';
import { JwtFromRequestFunction } from 'passport-jwt';

export const jwtExtractorFromCookies: JwtFromRequestFunction = (
  req: Request,
): string | null => {
  try {
    const access_token = req.cookies['access_token'];
    return access_token;
  } catch (err) {
    return null;
  }
};
