import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FilterProjectDto, SortProjectDto } from './dto/query-project.dto';
import { CreateBeneficiaryDto } from './dto/create-project.dto';

@Injectable()
export class BeneficiariesService {
  constructor(@InjectRepository(Project)
              private projectsRepository: Repository<Project>) {
  }

  create(createProjectDto: CreateBeneficiaryDto): Promise<Project> {
    return this.projectsRepository.save(
      this.projectsRepository.create(createProjectDto)
    );
  }

  findManyWithPagination({
                           topicId,
                           filterOptions,
                           sortOptions,
                           paginationOptions
                         }: {
    topicId?: number | null,
    filterOptions?: FilterProjectDto | null,
    sortOptions?: SortProjectDto[] | null,
    paginationOptions: IPaginationOptions;
  }): Promise<Project[]> {
    let where: FindOptionsWhere<Project> = filterOptions as FindOptionsWhere<Project>;

    if (!Number.isNaN(topicId)) {
      where = {topic: {id: Number(topicId)}, ...filterOptions} as FindOptionsWhere<Project>;
    }

    return this.projectsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });
  }

}
