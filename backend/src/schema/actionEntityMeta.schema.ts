import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Workflow } from "./workflow.schema";
import { Action } from "./action.schema";


@Entity({name : 'actionEntityMeta'})



export class ActionEntityMeta{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({ type: 'varchar', length: 255 })
  entity_actions_meta: string;

  @ManyToOne(() => Action, action => action.id)
  @JoinColumn({ name: 'action_id' })
  action: number;

  @ManyToOne(() => Workflow, workflow => workflow.id)
  @JoinColumn({ name: 'workflow_id' })
  workflow: number;

  @Column({ type: 'int' })
  action_order: number;

}