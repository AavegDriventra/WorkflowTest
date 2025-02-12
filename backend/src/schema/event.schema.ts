import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Workflow } from './workflow.schema';
import { Target } from './target.schema';


@Entity({name : 'event'}) 
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  entity_event_meta: string;

  @Column({ type: 'json', nullable: true })
  meta_data: any;

  @Column({ type: 'int', nullable: true })
  workflow_target_entity_events_id : number;

  @ManyToOne(() => Target, (workflowTargetEntityEvents) => workflowTargetEntityEvents.id, { nullable: true })
  @JoinColumn({ name: 'workflow_target_entity_events_id' })
  workflowTargetEntityEvents: Target;

  @Column({ type: 'int', nullable: true })
  workflow_id : number;


  @ManyToOne(() => Workflow, (workflow) => workflow.id, { nullable: true })
  @JoinColumn({ name: 'workflow_id' })
  workflow: Workflow;

  @Column({ type: 'int', nullable: true })
  event_order: number;
}
