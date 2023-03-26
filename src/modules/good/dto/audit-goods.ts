import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { GoodAuditStatus } from '../../../common/enums/good';

export default class AuditGoodsDto {
  @IsEnum(GoodAuditStatus)
  auditStatus: GoodAuditStatus;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  auditMessage: string;

  @IsOptional()
  isOnShelf: boolean;
}
