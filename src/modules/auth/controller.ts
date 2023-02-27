import { Controller, Post, UseGuards } from '@nestjs/common';
import { Public } from '../../decorator/public';
import { ReqUser } from '../../decorator/req-user';
import LocalAuthGuard from '../../guard/local-auth';
import AuthService from './service';

@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('token')
  postAuthLogin(@ReqUser() user: ReqUser) {
    return this.authService.postLogin(user);
  }
}
