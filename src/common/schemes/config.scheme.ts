import * as Joi from 'joi';

export const configScheme = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),

  // PORT
  PORT: Joi.number().required(),
  //DOMAIN
  DOMAIN: Joi.string(),
  //JWT
  ACCESS_TOKEN_SECRET: Joi.string().required(),
  REFRESH_TOKEN_SECRET: Joi.string().required(),
  ACCESS_TOKEN_EXPIRESIN: Joi.string().required(),
  REFRESH_TOKEN_EXPIRESIN: Joi.string().required(),
  //DB
  DATABASE_URL: Joi.string().required(),

  //kakao
  //   KAKAO_CLIENT_ID: Joi.string().required(),
  //   KAKAO_CALLBACK_URL: Joi.string().required(),

  //   //google
  //   GOOGLE_CLIENT_ID: Joi.string().required(),
  //   GOOGLE_SECRET: Joi.string().required(),
});
