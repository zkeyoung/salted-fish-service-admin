import { QueryOrder, wrap } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { GoodAuditStatus } from '../../common/enums/good';
import Good from '../orm/entities/good';
import AuditGoodsDto from './dto/audit-goods';
import QueryGoodsDto from './dto/query-goods';

@Injectable()
export default class GoodService {
  constructor(
    @InjectRepository(Good)
    private readonly goodRepository: EntityRepository<Good>,
  ) {}

  getGoods(queryGoodsDto: QueryGoodsDto) {
    const { page, perPage } = queryGoodsDto;
    return this.goodRepository.find(
      {
        auditStatus: GoodAuditStatus.WAIT,
      },
      {
        fields: [
          'auditStatus',
          'category',
          'preview',
          'price',
          'region',
          'title',
          'updatedAt',
        ],
        limit: perPage,
        offset: (page - 1) * perPage,
        orderBy: { updatedAt: QueryOrder.DESC },
      },
    );
  }

  getOneGood(id: string) {
    return this.goodRepository.findOne(id, {
      fields: [
        'auditStatus',
        'auditMessage',
        'category',
        'createdAt',
        'desc',
        'fileUrls',
        'preview',
        'price',
        'region',
        'title',
        'user',
        'user.id',
        'user.avatar',
        'user.nickname',
      ],
      populate: ['user'],
    });
  }

  async auditOneGood(id: string, auditGoodsDto: AuditGoodsDto) {
    const good = await this.goodRepository.findOne(id, {
      fields: ['id'],
    });
    if (auditGoodsDto.auditStatus === GoodAuditStatus.PASS) {
      auditGoodsDto.isOnShelf = true;
    }
    wrap(good).assign(auditGoodsDto);

    return this.goodRepository.flush();
  }
}
