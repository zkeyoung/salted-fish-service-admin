import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../../common/enums/user';
import { ConfigVariables } from '../../config';
import { ReqUser } from '../../decorator/req-user';
import CryptoService from '../crypto/service';
import LoginUserDto from '../user/dtos/login-user';

@Injectable()
export default class AuthService {
  private readonly app = this.configService.get('app', { infer: true });
  private readonly token = this.configService.get('token', { infer: true });

  constructor(
    private readonly configService: ConfigService<ConfigVariables>,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) {}

  async validateUser(loginUserDto: LoginUserDto): Promise<ReqUser> {
    const isMatched =
      loginUserDto.username === this.app.ADMIN_ACCOUNT &&
      loginUserDto.password === this.app.ADMIN_PWD;
    if (!isMatched) throw new BadRequestException();
    return { id: ''.padStart(32, '8'), roles: UserRole.ADMIN };
  }

  async postLogin(user: ReqUser) {
    const payload = {
      id: user.id,
      roles: user.roles,
    };
    const accessToken = await this.jwtSignPayload(payload);
    return { accessToken };
  }

  private async jwtSignPayload(payload: object) {
    const payloadBuffer = this.cryptoService.aesEncode(
      Buffer.from(JSON.stringify(payload)),
      this.token.TOKEN_PAYLOAD_SECRET,
    );
    const payloadEncrypt = payloadBuffer.toString('hex');
    return await this.jwtService.signAsync({ encrypt: payloadEncrypt });
  }
}
