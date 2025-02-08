import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'workflow'})
 

export class Workflow {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "varchar", length: 255 })
    workflow_name: string;
}