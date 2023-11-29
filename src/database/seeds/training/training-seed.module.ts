import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { TrainingSeedService } from './training-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [TrainingSeedService],
  exports: [TrainingSeedService]
})
export class TrainingSeedModule {
}
