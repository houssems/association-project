import { Controller, Get, HttpCode, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { infinityPagination } from '../utils/infinity-pagination';
import { ProjectsService } from './projects.service';
import { QueryProjectDto } from './dto/query-project.dto';
import { Project } from './entities/project.entity';


@ApiBearerAuth()
@Roles(RoleEnum.admin)
@ApiTags('Project')
@Controller({
  path: 'projects',
  version: '1'
})
export class ProjectsController {

  constructor(private readonly projectsService: ProjectsService) {
  }

  @Get(':topicId?')
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Param('topicId') topicId,
    @Query() query: QueryProjectDto,
  ): Promise<InfinityPaginationResultType<Project>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }


    return infinityPagination(
      await this.projectsService.findManyWithPagination({
        topicId: topicId,
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }
}
