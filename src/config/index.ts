import { ConfigType } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { Environment } from '../common/enums/app';
import appConfig from './app.config';
import mongoConfig from './mongo.config';
import redisConfig from './redis.config';
import tokenConfig from './token.config';

export const ConfigLoadList = [
  appConfig,
  mongoConfig,
  redisConfig,
  tokenConfig,
];

export class ConfigVariables {
  app: ConfigType<typeof appConfig>;
  mongo: ConfigType<typeof mongoConfig>;
  redis: ConfigType<typeof redisConfig>;
  token: ConfigType<typeof tokenConfig>;
}

export function ConfigValidate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;
  @IsNumber()
  APP_PORT: number;
  @IsString()
  ADMIN_ACCOUNT: string;
  @IsString()
  ADMIN_PWD: string;

  @IsString()
  TOKEN_SECRET: string;
  @IsString()
  TOKEN_PAYLOAD_SECRET: string;
  @IsString()
  TOKEN_EXPIRE: string;

  @IsString()
  @IsOptional()
  MONGO_ClIENT_URL: string;
  @IsString()
  MONGO_DB_NAME: string;

  @IsString()
  @IsOptional()
  REDIS_HOST: string;
  @IsNumber()
  @IsOptional()
  REDIS_PORT: number;
}
