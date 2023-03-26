import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request } from 'express';
import { Strategy } from 'passport-local';
import LoginUserDto from '../../user/dtos/login-user';
import AuthService from '../service';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(req: Request) {
    const loginUserDto = plainToInstance(LoginUserDto, req.body);
    const errors = await validate(loginUserDto);
    if (errors.length) {
      throw new BadRequestException();
    }
    const user = await this.authService.validateUser(loginUserDto);
    return user;
  }
}
