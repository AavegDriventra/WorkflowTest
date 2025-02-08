import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EntityList } from './entityList.schema';


@Entity({name : 'target'})
export class Target {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  workflow_target_entity_events: string;

  @Column({ type: 'int', nullable: true })
  workflow_target_entity_id: number;

  @ManyToOne(() => EntityList, entityList => entityList.id)
  @JoinColumn({ name: 'workflow_target_entity_id' })
  entityList: EntityList;

  @Column({ type: 'text', nullable: true })
  component_name: string;
}
