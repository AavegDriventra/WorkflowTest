import { Controller, Get } from '@nestjs/common';
import { TicketService } from 'src/services/ticket.service';


@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  // Endpoint to get all ticket fields
  @Get('fields')
  getTicketFields(): string[] {
    return this.ticketService.getTicketFields();
  }
}
