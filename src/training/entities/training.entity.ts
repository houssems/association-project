import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { User } from '../../users/entities/user.entity';

@Entity('training')
export class Training extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: String, nullable: false })
  eventName: string;

  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Column({ type: 'timestamptz' })
  endDate: Date;

  @Column('text', { array: true, default: '{}' })
  guestSpeakers: string[];

  @ManyToMany(() => User, (attendee) => attendee.trainings, { eager: true })
  @JoinTable({
    name: 'attendee',
    joinColumn: {
      name: 'training_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    }
  })
  attendees: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
