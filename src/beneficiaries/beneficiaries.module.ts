import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Project } from './entities/project.entity';
import { BeneficiariesController } from './projects.controller';
import { BeneficiariesService } from './projects.service';


@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [BeneficiariesController],
  providers: [IsExist, IsNotExist, BeneficiariesService],
  exports: [BeneficiariesService]
})
export class BeneficiariesModule {
}
