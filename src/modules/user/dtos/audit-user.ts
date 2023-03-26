import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { UserAuditStatus } from '../../../common/enums/user';

export default class AuditUserDto {
  @IsEnum(UserAuditStatus)
  auditStatus: UserAuditStatus;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  auditMessage: string;
}
