import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Request, UseGuards } from '@nestjs/common';
import { TrainingService } from './training.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { Training } from './entities/training.entity';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { CreateTrainingDto } from './dto/create-training.dto';
import { AssignAttendeeDto } from './dto/assign-attendee.dto';
import { Attendee } from './entities/attendee.entity';
import { QueryTrainingDto } from './dto/query-training.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@ApiTags('Training')
@Controller({
  path: 'training',
  version: '1'
})
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTrainingDto: CreateTrainingDto): Promise<Training> {
    return this.trainingService.create(createTrainingDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/assign-attendee')
  @HttpCode(HttpStatus.CREATED)
  assignAttendeeToTraining(
    @Request() request,
    @Body() assignAttendeeDto: AssignAttendeeDto
  ): Promise<Attendee> {
    return this.trainingService.assignAttendeeToTraining(request.user.id, assignAttendeeDto);
  }

  @Get('/{id}')
  @HttpCode(HttpStatus.OK)
  getDetails(@Request() request) {

  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryTrainingDto
  ): Promise<InfinityPaginationResultType<Training>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.trainingService.findManyWithPagination({
        paginationOptions: {
          page,
          limit
        }
      }),
      { page, limit }
    );
  }
}
