import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Validate, ValidateNested } from 'class-validator';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { Project } from '../entities/project.entity';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { Topic } from '../../topics/entities/topic.entity';


export class FilterProjectDto {
  @ApiProperty({ type: Number })
  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => (value ? Number(value) : null))
  ageMinimum?: number | null;

  @ApiProperty({ type: Number })
  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => (value ? Number(value) : null))
  ageMaximum?: number | null;

  @ApiProperty({ type: String })
  @IsOptional()
  @Type(() => String)
  season?: string | null;

  @ApiProperty({ type: String })
  @IsOptional()
  @Type(() => String)
  duration?: string | null;
}

export class SortProjectDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Project;

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

  @ApiProperty({ type: () => Topic })
  @IsOptional()
  @Validate(IsExist, ['Topic', 'id'], {
    message: 'TopicNotExists'
  })
  topic: Topic | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterProjectDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterProjectDto)
  filters?: FilterProjectDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    return value ? plainToInstance(SortProjectDto, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortProjectDto)
  sort?: SortProjectDto[] | null;
}
