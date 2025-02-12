import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EntityList } from './entityList.schema';

@Entity({ name: 'action' })
export class Action {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  action_name: string;

  @Column({ type: 'int', nullable: true })
  entity_id: number;

  @ManyToOne(() => EntityList, (entityList) => entityList.id)
  @JoinColumn({ name: 'entity_id' })
  entityList: EntityList;

  @Column({ length: 255 })
  action_components: string;
}
