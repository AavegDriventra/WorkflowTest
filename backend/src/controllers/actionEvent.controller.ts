import { Controller, Post , Body, Get } from "@nestjs/common";
import { Action } from "src/schema/action.schema";
import { ActionEntityMeta } from "src/schema/actionEntityMeta.schema";
import { ActionEvent } from "src/schema/actionEvent.schema";
import { ActionEventService } from "src/services/actionEvent.service";


@Controller('actionevent')
export class ActionEventController {
    constructor(private readonly actionEventService: ActionEventService) {}

    @Post('add')
    async createActionEvent(@Body() actionEvent: ActionEvent): Promise<ActionEvent> {
        return await this.actionEventService.createActionEvent(actionEvent);
    }

    @Get('all')
    async getAllActionEvent(): Promise<ActionEvent[]> {
        return await this.actionEventService.getAllActionEvent();
    }

    @Post("byids")
    async getActionEventsByIds(@Body("action_component_id") id: number): Promise<ActionEvent[]> {
        return await this.actionEventService.getActionEventsByIds(id);
    }
}