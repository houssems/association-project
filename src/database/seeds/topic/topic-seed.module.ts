import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicSeedService } from './topic-seed.service';
import { Topic } from 'src/topics/entities/topic.entity';
import { User } from '../../../users/entities/user.entity';
import { FileEntity } from '../../../files/entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topic]), TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([FileEntity])],
  providers: [TopicSeedService],
  exports: [TopicSeedService]
})
export class TopicSeedModule {
}
