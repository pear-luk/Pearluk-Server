import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_SECRET,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRESIN,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRESIN,
  reissueRefreshTokenExpiresIn: process.env.REISSUE_REFRESH_TOKEN_EXPIRESIN,
}));
