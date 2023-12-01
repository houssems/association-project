import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { Beneficiary } from '../entities/beneficiary.entity';
import { BeneficiaryStatusEnum } from '../beneficiary-status.enum';


export class FilterBeneficiaryDto {

  @ApiProperty({ type: String })
  @IsOptional()
  @Type(() => String)
  email?: string | null;

  @ApiProperty({ type: String })
  @IsOptional()
  @Type(() => String)
  telephone?: string | null;

  @ApiProperty({ type: BeneficiaryStatusEnum })
  @IsOptional()
  @IsEnum(BeneficiaryStatusEnum)
  status: BeneficiaryStatusEnum;
}

export class SortBeneficiaryDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Beneficiary;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryBeneficiaryDto {
  @ApiProperty({
    required: false
  })
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({
    required: false
  })
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiProperty({
    required: false
  })

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterBeneficiaryDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterBeneficiaryDto)
  filters?: FilterBeneficiaryDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    return value ? plainToInstance(SortBeneficiaryDto, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortBeneficiaryDto)
  sort?: SortBeneficiaryDto[] | null;
}
