import { Injectable } from '@nestjs/common';
import { Contact } from 'src/schema/contact.table.schema';
import { getMetadataArgsStorage } from 'typeorm';

@Injectable()
export class ContactService {
  // Method to get the column names of the Contact entity
  getContactFields(): string[] {
    // Get metadata for the Contact entity
    const metadata = getMetadataArgsStorage().columns.filter(
      (column) => column.target === Contact,
    );

    // Extract and return the column names
    return metadata.map((column) => column.propertyName);
  }
}
