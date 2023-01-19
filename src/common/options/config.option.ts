import { ConfigModuleOptions } from '@nestjs/config';
import authConfig from '../../config/authConfig';
import { configScheme } from './../schemes/config.scheme';
export const configOption: ConfigModuleOptions = {
  envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],

  validationSchema: configScheme,
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
  isGlobal: true,
  load: [authConfig],
};
