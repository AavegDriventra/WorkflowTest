import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/schema/ticket.table.schema';
import { Repository } from 'typeorm';
import { EntityMetadata } from 'typeorm/metadata/EntityMetadata';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  // Fetch the fields (columns) of the Ticket entity
  getTicketFields(): string[] {
    const metadata: EntityMetadata = this.ticketRepository.metadata;
    const columns = metadata.columns.map(column => column.propertyName); // Extract column names
    return columns;
  }

  // Other CRUD operations can be added as needed (create, find, etc.)
}
