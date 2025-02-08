import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('contacts') 
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;  // Primary key

  @Column({ type: 'varchar', length: 255 })
  first_name: string;

  @Column({ type: 'varchar', length: 255 })
  last_name: string;

  @Column({ type: 'varchar', length: 20 })
  contact_number: string;

  @Column({ type: 'varchar', length: 255, })
  email_address: string;
}
