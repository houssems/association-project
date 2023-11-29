import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Training } from './training.entity';
import { User } from '../../users/entities/user.entity';

@Entity('attendee')
export class Attendee extends EntityHelper {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @PrimaryColumn({ name: 'training_id' })
  trainingId: number;

  @ManyToOne(() => User, (user) => user.trainings, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  students: User[];

  @ManyToOne(() => Training, (training) => training.attendees, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn([{ name: 'training_id', referencedColumnName: 'id' }])
  training: Training[];
}
