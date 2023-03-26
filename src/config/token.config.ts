import { registerAs } from '@nestjs/config';

export default registerAs('token', () => ({
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  TOKEN_PAYLOAD_SECRET: process.env.TOKEN_PAYLOAD_SECRET,
  TOKEN_EXPIRE: process.env.TOKEN_EXPIRE,
}));
