import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ticket') // Specify the table name
export class Ticket {
  @PrimaryGeneratedColumn() // Primary key with auto-increment
  ticketId: number;

  @Column({ type: 'text' }) // Description as text
  description: string;

  @Column({
    type: 'enum',
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'], // Enum for status
    default: 'Open', // Default status
  })
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';

  @Column({
    type: 'enum',
    enum: ['Low', 'Medium', 'High', 'Urgent'], // Enum for priority
    default: 'Low', // Default priority
  })
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';

  @Column({
    type: 'enum',
    enum: ['Low', 'Medium', 'High', 'Critical'], // Enum for severity
    default: 'Low', // Default severity
  })
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
}
