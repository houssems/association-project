import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { FileEntity } from 'src/files/entities/file.entity';
import { Topic } from 'src/topics/entities/topic.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ProjectsSeasonEnum } from '../projects-season.enum';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
@Entity('project')
export class Project extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Index()
  @ApiProperty({ example: 'title' })
  @Column({ type: String, nullable: false })
  title: string;

  @ManyToOne(() => Topic, (topic) => topic.projects)
  @JoinColumn({ name: 'topicId' })
  topic: Topic;

  @Expose()
  @ApiProperty({ example: 'summary' })
  @Column('text', { array: true, default: '{}', nullable: true })
  summary: string[];

  @Expose()
  @ApiProperty({ example: 'P15D' })
  @Column({ type: String, nullable: false })
  duration: string;

  @Expose()
  @ApiProperty({ example: 16 })
  @Column({ type: 'integer', nullable: false })
  ageMinimum: number;

  @Expose()
  @ApiProperty({ example: 18 })
  @Column({ type: 'integer', nullable: true })
  ageMaximum: number;

  @Expose()
  @ApiProperty({ example: 'SUMMER' })
  @Column({ type: String, nullable: true })
  season: ProjectsSeasonEnum;

  @Expose()
  @ManyToOne(() => FileEntity, {
    eager: true
  })
  video?: FileEntity | null;

  @Expose()
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
