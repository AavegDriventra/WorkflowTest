import { Controller, Post, Get, Body } from '@nestjs/common';
import { ActionEntityMeta } from 'src/schema/actionEntityMeta.schema';
import { ActionEntityMetaService } from 'src/services/entityActionMeta.service';

@Controller('actionentitymeta')
export class ActionEntityMetaController {
  constructor(private readonly actionEntityMetaService: ActionEntityMetaService) {}

 
  @Post("/add")
  async createAction(@Body() actionEntityMetaData: ActionEntityMeta): Promise<ActionEntityMeta> {
    return await this.actionEntityMetaService.createAction(actionEntityMetaData);
  }

  @Get("/all")
  async getAllActions(): Promise<ActionEntityMeta[]> {
    return await this.actionEntityMetaService.getAllActions();
  }
}
