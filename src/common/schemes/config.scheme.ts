import * as Joi from 'joi';

export const configScheme = Joi.object({
  // PORT
  PORT: Joi.number().required(),

  //DOMAIN
  DOMAIN: Joi.string(),

  // CORS set
  CORS: Joi.string(),

  //DB
  DATABASE_URL: Joi.string().required(),

  KAKAO_REST_API_KEY: Joi.string().required(),
  KAKAO_REDIRECT_URI: Joi.string().required(),

  //JWT
  ACCESS_TOKEN_SECRET: Joi.string().required(),
  REFRESH_TOKEN_SECRET: Joi.string().required(),
  ACCESS_TOKEN_EXPIRESIN: Joi.string().required(),
  REFRESH_TOKEN_EXPIRESIN: Joi.string().required(),
  REISSUE_REFRESH_TOKEN_EXPIRESIN: Joi.number().required(),
});
