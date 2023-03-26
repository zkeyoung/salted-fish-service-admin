import { IsEnum, IsOptional } from 'class-validator';
import PagingDto from '../../../common/dtos/paging';
import { GoodAuditStatus } from '../../../common/enums/good';

export default class QueryGoodsDto extends PagingDto {
  @IsOptional()
  @IsEnum(GoodAuditStatus)
  auditStatus: GoodAuditStatus;
}
