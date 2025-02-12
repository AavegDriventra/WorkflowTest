import { ActionEntityMeta } from './schema/actionEntityMeta.schema';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityList } from './schema/entityList.schema';
import { Workflow } from './schema/workflow.schema';
import { Target } from './schema/target.schema';
import { Event } from './schema/event.schema';
import { EntityListController } from './controllers/entityList.controller';
import { EntityListService } from './services/entityList.service';
import { TargetController } from './controllers/target.controller';
import { TargetService } from './services/target.service';
import { Action } from './schema/action.schema';
import { WorkflowController } from './controllers/workflow.controller';
import { WorkFlowService } from './services/workflow.service';
import { ActionController } from './controllers/action.controller';
import { ActionService } from './services/action.service';
import { ActionEntityMetaController } from './controllers/entityActionMeta.controller';
import { ActionEntityMetaService } from './services/entityActionMeta.service';
import { EventController } from './controllers/event.controller';
import { EventService } from './services/event.service';
import { Ticket } from './schema/ticket.table.schema';
import { TicketController } from './controllers/ticket.controller';
import { TicketService } from './services/ticket.service';
import { Contact } from './schema/contact.table.schema';
import { ContactController } from './controllers/contact.controller';
import { ContactService } from './services/contact.service';
import { ActionEvent } from './schema/actionEvent.schema';
import { ActionEventService } from './services/actionEvent.service';
import { ActionEventController } from './controllers/actionEvent.controller';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password:'Aaveg123@',
    database:'test_workflow',
    entities:[EntityList , Workflow , Target , Event , Action , ActionEntityMeta , Ticket , Contact , ActionEvent],
    synchronize: false,
    logging: true,
    }
  ) ,
  TypeOrmModule.forFeature([EntityList , Target , Action , Workflow ,Event , ActionEntityMeta , Ticket  , Contact , ActionEvent])
  
],
  controllers: [EntityListController , TargetController ,ActionController, WorkflowController , EventController , ActionEntityMetaController , TicketController , ContactController , ActionEventController ],
  providers: [EntityListService , TargetService , ActionService , WorkFlowService , EventService , ActionEntityMetaService , TicketService , ContactService , ActionEventService],
})
export class AppModule {}
