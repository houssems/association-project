import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { Training } from './entities/training.entity';
import { CreateTrainingDto } from './dto/create-training.dto';
import { Attendee } from './entities/attendee.entity';
import { AssignAttendeeDto } from './dto/assign-attendee.dto';
import { isPast } from 'date-fns';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(Training)
    private trainingRepository: Repository<Training>,
    @InjectRepository(Attendee)
    private attendeesRepository: Repository<Attendee>
  ) {
  }

  create(createTrainingDto: CreateTrainingDto): Promise<Training> {
    return this.trainingRepository.save(
      this.trainingRepository.create(createTrainingDto)
    );
  }

  async assignAttendeeToTraining(
    userId: number,
    assignAttendeeDto: AssignAttendeeDto
  ): Promise<Attendee> {
    const training = await this.trainingRepository.findOneBy({
      id: assignAttendeeDto.trainingId
    });

    if (
      isPast(training?.startDate as Date) ||
      isPast(training?.endDate as Date)
    ) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            training: 'trainingHasDue'
          }
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
    return this.attendeesRepository.save(
      this.attendeesRepository.create({
        userId,
        trainingId: assignAttendeeDto.trainingId
      })
    );
  }

  findManyWithPagination({
                           paginationOptions
                         }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Training[]> {
    return this.trainingRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit
    });
  }
}
