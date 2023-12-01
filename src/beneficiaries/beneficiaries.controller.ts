import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { infinityPagination } from '../utils/infinity-pagination';
import { BeneficiariesService } from './beneficiaries.service';
import { QueryBeneficiaryDto } from './dto/query-beneficiary.dto';
import { Beneficiary } from './entities/beneficiary.entity';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';


@ApiBearerAuth()
@Roles(RoleEnum.admin)
@ApiTags('Beneficiary')
@Controller({
  path: 'beneficiaries',
  version: '1'
})
export class BeneficiariesController {

  constructor(private readonly beneficiariesService: BeneficiariesService) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBeneficiaryDto: CreateBeneficiaryDto): Promise<Beneficiary> {
    return this.beneficiariesService.create(createBeneficiaryDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryBeneficiaryDto,
  ): Promise<InfinityPaginationResultType<Beneficiary>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }


    return infinityPagination(
      await this.beneficiariesService.findManyWithPagination({
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
