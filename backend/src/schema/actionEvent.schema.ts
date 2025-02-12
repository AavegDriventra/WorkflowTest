import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Action } from './action.schema';

@Entity('actionEvent')
export class ActionEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  action_field: string;

  @Column({ type: 'int', nullable: true })
  action_component_id: number;

  @ManyToOne(() => Action, (action) => action.id)
  @JoinColumn({ name: 'action_component_id' })
  action: Action;
}
