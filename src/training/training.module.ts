import { Module } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Training } from './entities/training.entity';
import { Attendee } from './entities/attendee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Training]), TypeOrmModule.forFeature([Attendee])],
  controllers: [TrainingController],
  providers: [IsExist, IsNotExist, TrainingService],
  exports: [TrainingService]
})
export class TrainingModule {
}
