import { IsString, Length } from 'class-validator';

export default class LoginUserDto {
  @IsString()
  @Length(1, 22)
  username: string;

  @IsString()
  @Length(1, 16)
  password: string;
}
