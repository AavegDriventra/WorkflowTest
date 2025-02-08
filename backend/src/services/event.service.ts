import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/schema/event.schema';


@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly EventServiceRepository: Repository<Event>,
  ) {}

  async createEvent(eventData:Event ): Promise<Event> {
    const event = this.EventServiceRepository.create(eventData);
    return await this.EventServiceRepository.save(event);
  }

  async getAllEvent(): Promise<Event[]> {
    return await this.EventServiceRepository.find();
  }
}
