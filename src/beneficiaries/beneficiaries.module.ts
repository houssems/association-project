import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Beneficiary } from './entities/beneficiary.entity';
import { BeneficiariesController } from './beneficiaries.controller';
import { BeneficiariesService } from './beneficiaries.service';


@Module({
  imports: [TypeOrmModule.forFeature([Beneficiary])],
  controllers: [BeneficiariesController],
  providers: [IsExist, IsNotExist, BeneficiariesService],
  exports: [BeneficiariesService]
})
export class BeneficiariesModule {
}
