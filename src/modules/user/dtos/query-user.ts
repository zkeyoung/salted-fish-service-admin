import { IntersectionType, PartialType, PickType } from '@nestjs/mapped-types';
import PagingDto from '../../../common/dtos/paging';
import AuditUserDto from './audit-user';

export default class QueryUserDto extends IntersectionType(
  PagingDto,
  PartialType(PickType(AuditUserDto, ['auditStatus'])),
) {}
