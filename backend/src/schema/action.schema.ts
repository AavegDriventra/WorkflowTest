import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name : 'action'})
export class Action {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  action_components: string;

  @Column({ length: 255 })
  action_name: string;

  @Column({ length: 255 })
  action_path: string;
}
