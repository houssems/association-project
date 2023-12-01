import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beneficiary } from 'src/beneficiaries/entities/beneficiary.entity';
import { BeneficiarySeedService } from './beneficiary-seed.service';
import { FileEntity } from '../../../files/entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Beneficiary]), TypeOrmModule.forFeature([FileEntity])],
  providers: [BeneficiarySeedService],
  exports: [BeneficiarySeedService]
})
export class BeneficiarySeedModule {
}
