import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';


@Module({
  imports: [TypeOrmModule.forFeature([Project]), TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [IsExist, IsNotExist, ProjectsService],
  exports: [ProjectsService]
})
export class ProjectsModule {
}
