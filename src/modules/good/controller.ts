import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import MongoIdDto from '../../common/dtos/mongo-id';
import AuditGoodsDto from './dto/audit-goods';
import QueryGoodsDto from './dto/query-goods';
import GoodService from './service';

@Controller('goods')
export default class GoodsController {
  constructor(private readonly goodService: GoodService) {}

  @Get()
  async findAllGoods(@Query() queryGoodsDto: QueryGoodsDto) {
    return this.goodService.getGoods(queryGoodsDto);
  }

  @Patch(':id')
  async auditGood(
    @Param() { id: goodId }: MongoIdDto,
    @Body() auditGoodsDto: AuditGoodsDto,
  ) {
    await this.goodService.auditOneGood(goodId, auditGoodsDto);
  }

  @Get(':id')
  async findGoodDetail(@Param() { id: goodId }: MongoIdDto) {
    return this.goodService.getOneGood(goodId);
  }
}
