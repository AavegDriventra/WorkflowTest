import { Controller, Get, Post, Body } from '@nestjs/common';
import { Action } from 'src/schema/action.schema';
import { ActionService } from 'src/services/action.service';



@Controller('actions')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Post("add")
  async createAction(@Body() actionData: Action): Promise<Action> {
    return await this.actionService.createAction(actionData);
  }

  @Get("all")
  async getAllActions(): Promise<Action[]> {
    return await this.actionService.getAllActions();
  }
}
