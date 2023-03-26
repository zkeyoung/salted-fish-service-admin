import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import MongoIdDto from '../../common/dtos/mongo-id';
import AuditUserDto from './dtos/audit-user';
import QueryUserDto from './dtos/query-user';
import UserService from './service';

@Controller('users')
export default class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  async getUserList(@Query() queryUserDto: QueryUserDto) {
    return this.userService.findUsers(queryUserDto);
  }

  @Get(':id')
  getOneUser(@Param() { id: userId }: MongoIdDto) {
    return this.userService.findUserById(userId);
  }

  @Patch(':id/audit')
  async auditUserProfile(
    @Param() { id: userId }: MongoIdDto,
    @Body() auditUserDto: AuditUserDto,
  ) {
    await this.userService.auditUserProfile(userId, auditUserDto);
  }
}
