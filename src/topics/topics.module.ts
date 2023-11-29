import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Topic } from './entities/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topic]), TypeOrmModule.forFeature([Topic])],
  controllers: [TopicsController],
  providers: [IsExist, IsNotExist, TopicsService],
  exports: [TopicsService]
})
export class TopicsModule {
}
