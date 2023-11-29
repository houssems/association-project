import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { FileEntity } from '../../files/entities/file.entity';
import { Topic } from '../../topics/entities/topic.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ProjectsSeasonEnum } from '../projects-season.enum';

@Entity('project')
export class Project extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @ApiProperty({ example: 'title' })
  @Column({ type: String, nullable: false })
  title: string;

  @ManyToOne(() => Topic, (topic) => topic.projects)
  topic: Topic;

  @ApiProperty({ example: 'summary' })
  @Column('text', { array: true, default: '{}' })
  summary: string[];

  @ApiProperty({ example: 'P15D' })
  @Column({ type: String, nullable: false })
  duration: string;

  @ApiProperty({ example: 16 })
  @Column({ type: String, nullable: false })
  ageMinimum: number;

  @ApiProperty({ example: 18 })
  @Column({ type: String, nullable: true })
  ageMaximum: number;

  @ApiProperty({ example: 'SUMMER' })
  @Column({ type: String, nullable: true })
  season: ProjectsSeasonEnum;

  @OneToOne(() => FileEntity, {
    eager: true
  })
  video?: FileEntity | null;

  @ApiProperty({ example: '["section1", "section2"]' })
  @Column('text', { array: true, default: '{}' })
  sections: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
