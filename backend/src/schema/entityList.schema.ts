import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'entitylist' })

export class EntityList {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "varchar", length: 255 })
    workflow_target_entities: string;
  }

