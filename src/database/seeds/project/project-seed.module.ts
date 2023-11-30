import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectSeedService } from './project-seed.service';
import { Topic } from 'src/topics/entities/topic.entity';
import { Project } from '../../../projects/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topic]), TypeOrmModule.forFeature([Project])],
  providers: [ProjectSeedService],
  exports: [ProjectSeedService]
})
export class ProjectSeedModule {
}
