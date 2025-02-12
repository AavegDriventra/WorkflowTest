import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workflow } from './workflow.schema';
import { Action } from './action.schema';

@Entity({ name: 'actionEntityMeta' })
export class ActionEntityMeta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  entity_actions_meta: string;

  @Column({ type: 'int', nullable: true })
  action_id: number;

  @ManyToOne(() => Action, (action) => action.id)
  @JoinColumn({ name: 'action_id' })
  action: Action;

  @Column({ type: 'int', nullable: true })
  workflow_id: number;

  @ManyToOne(() => Workflow, (workflow) => workflow.id)
  @JoinColumn({ name: 'workflow_id' })
  workflow: Workflow;

  @Column({ type: 'int' })
  action_order: number;
}
