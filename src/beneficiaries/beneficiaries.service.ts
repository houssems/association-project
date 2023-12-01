import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Beneficiary } from './entities/Beneficiary.entity';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FilterBeneficiaryDto, SortBeneficiaryDto } from './dto/query-Beneficiary.dto';
import { CreateBeneficiaryDto } from './dto/create-Beneficiary.dto';

@Injectable()
export class BeneficiariesService {
  constructor(@InjectRepository(Beneficiary)
              private BeneficiariesRepository: Repository<Beneficiary>) {
  }

  create(createBeneficiaryDto: CreateBeneficiaryDto): Promise<Beneficiary> {
    return this.BeneficiariesRepository.save(
      this.BeneficiariesRepository.create(createBeneficiaryDto)
    );
  }

  findManyWithPagination({
                           filterOptions,
                           sortOptions,
                           paginationOptions
                         }: {
    filterOptions?: FilterBeneficiaryDto | null,
    sortOptions?: SortBeneficiaryDto[] | null,
    paginationOptions: IPaginationOptions;
  }): Promise<Beneficiary[]> {
    let where: FindOptionsWhere<Beneficiary> = filterOptions as FindOptionsWhere<Beneficiary>;

    return this.BeneficiariesRepository.find({
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
