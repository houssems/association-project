import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { User } from '../../users/entities/user.entity';
import { FileEntity } from '../../files/entities/file.entity';
import { Project } from '../../projects/entities/project.entity';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
@Entity('topic')
export class Topic extends EntityHelper {

  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Index()
  @Column({ type: String, nullable: false })
  title: string;

  @Expose()
  @Column({ type: String, nullable: true })
  subtitle: string;

  @Expose()
  @ManyToOne(() => FileEntity, {
    eager: true
  })
  photo?: FileEntity | null;

  @Expose()
  @Column({ type: 'text' })
  content: string;

  @OneToMany(() => Project, (project) => project.topic, { nullable: true })
  projects: Project[];

  @Expose()
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'userId' })
  contact: User;


  @Expose()
  @Column('text', { array: true, default: '{}' })
  sections: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
