import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { FileEntity } from 'src/files/entities/file.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { BeneficiaryStatusEnum } from '../beneficiary-status.enum';

@Exclude()
@Entity('beneficiary')
export class Beneficiary extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Index()
  @ApiProperty({ example: 'Hdadra zoo' })
  @Column({ type: String, nullable: false })
  name: string;

  @Expose()
  @ApiProperty({ example: 'Hdadra 5017, Monastir' })
  @Column({ type: String, nullable: false })
  address: string;

  @Expose()
  @ApiProperty({ example: 'Tunisie' })
  @Column({ type: String, nullable: false })
  country: string;

  @Expose()
  @ApiProperty({ example: '+2169xxxxxxx' })
  @Column({ type: String, nullable: false })
  telephone: string;

  @Expose()
  @ApiProperty({ example: 'hdadra.zoo@gmail.com' })
  @Column({ type: String, nullable: false })
  email: string;

  @Expose()
  @ManyToOne(() => FileEntity, {
    eager: true
  })
  photo?: FileEntity | null;

  @Expose()
  @ApiProperty({ example: 'summary' })
  @Column('text', { array: true, default: '{}', nullable: true })
  summary: string[];

  @Expose()
  @ApiProperty({ example: '["section1", "section2"]' })
  @Column('text', { array: true, default: '{}' })
  sections: string[];

  @Expose()
  @ApiProperty({ example: 'ACTIVE' })
  @Column({ type: String, nullable: true })
  status: BeneficiaryStatusEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
