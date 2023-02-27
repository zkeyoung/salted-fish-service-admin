import { QueryOrder } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserAuditStatus } from '../../common/enums/user';
import User from '../orm/entities/user';
import AuditUserDto from './dtos/audit-user';
import QueryUserDto from './dtos/query-user';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id, {
      fields: ['nickname', 'avatar'],
    });
    if (!user) throw new BadRequestException();
    return user;
  }

  async auditUserProfile(userId, { auditMessage, auditStatus }: AuditUserDto) {
    const user = await this.userRepository.findOne(userId, {
      fields: ['id', 'auditProfile'],
    });
    if (!user) throw new BadRequestException();
    if (auditStatus === UserAuditStatus.PASS) {
      user.nickname = user.auditProfile.nickname;
      user.avatar = user.auditProfile.avatar;
    }
    const auditProfile = { ...user.auditProfile };
    auditProfile.status = auditStatus;
    if (auditMessage) auditProfile.message = auditMessage;
    user.auditProfile = auditProfile;
    await this.userRepository.flush();
  }

  async findUsers({ page, perPage, auditStatus }: QueryUserDto) {
    const users = await this.userRepository.find(
      auditStatus
        ? {
            auditProfile: {
              status: auditStatus,
            },
          }
        : {},
      {
        fields: ['avatar', 'nickname', 'auditProfile'],
        limit: perPage,
        offset: (page - 1) * perPage,
        orderBy: { updatedAt: QueryOrder.DESC },
      },
    );
    return users;
  }
}
