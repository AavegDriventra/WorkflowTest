import { Controller, Get } from '@nestjs/common';
import { ContactService } from 'src/services/contact.service';


@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get('fields')
  getContactFields(): string[] {
    return this.contactService.getContactFields(); // Returns field names from the service
  }
}
