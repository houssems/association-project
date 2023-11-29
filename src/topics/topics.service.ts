import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from './entities/topic.entity';
import { CreateTopicDto } from './dto/create-topic.dto';
import { IPaginationOptions } from '../utils/types/pagination-options';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private topicsRepository: Repository<Topic>
  ) {
  }

  create(createTopicDto: CreateTopicDto): Promise<Topic> {
    return this.topicsRepository.save(
      this.topicsRepository.create(createTopicDto)
    );
  }

  findManyWithPagination({
                           paginationOptions
                         }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Topic[]> {
    return this.topicsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit
    });
  }
}
