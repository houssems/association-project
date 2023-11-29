import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { QueryTopicsDto } from './dto/query-topics.dto';
import { CreateTopicDto } from './dto/create-topic.dto';
import { TopicsService } from './topics.service';
import { Topic } from './entities/topic.entity';

@ApiTags('Topics')
@Controller({
  path: 'topics',
  version: '1'
})
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTopicDto: CreateTopicDto): Promise<Topic> {
    return this.topicsService.create(createTopicDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryTopicsDto
  ): Promise<InfinityPaginationResultType<Topic>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.topicsService.findManyWithPagination({
        paginationOptions: {
          page,
          limit
        }
      }),
      { page, limit }
    );
  }
}
