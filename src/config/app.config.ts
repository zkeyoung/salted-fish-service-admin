import { registerAs } from '@nestjs/config';
import { Environment } from '../common/enums/app';

export default registerAs('app', () => ({
  env: process.env.NODE_ENV || Environment.DEVELOPMENT,
  port: Number.parseInt(process.env.APP_PORT, 10) || 3000,
  ADMIN_ACCOUNT: process.env.ADMIN_ACCOUNT,
  ADMIN_PWD: process.env.ADMIN_PWD,
}));
