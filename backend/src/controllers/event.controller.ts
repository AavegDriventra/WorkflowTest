import { Controller, Post, Get, Body } from '@nestjs/common';
import { Event } from 'src/schema/event.schema';
import { EventService } from 'src/services/event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

 
  @Post("add")
  async createEvent(@Body() eventData: Event): Promise<Event> {
    return await this.eventService.createEvent(eventData);
  }

 
  @Get("all")
  async getAllEvents(): Promise<Event[]> {
    return await this.eventService.getAllEvent();
  }
}
