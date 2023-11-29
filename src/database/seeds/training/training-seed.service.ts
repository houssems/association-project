import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Training } from '../../../training/entities/training.entity';

@Injectable()
export class TrainingSeedService {
  constructor(
    @InjectRepository(Training)
    private repository: Repository<Training>
  ) {
  }

  async run() {
  }
}
