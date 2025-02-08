import { Target } from './../schema/target.schema';
import { Body, Controller, Post  , Get} from "@nestjs/common";
import { EntityList } from "src/schema/entityList.schema";
import { TargetService } from 'src/services/target.service';


@Controller('target')
export class TargetController {

    constructor(private readonly targetService: TargetService
    ) {}

    
    @Post('add')
    addtarget(@Body() data : Target){
        return this.targetService.addTarget(data);
    }

    @Get('all')
    getEntity(){
        return this.targetService.getAllTarget();
    }

    @Post('getTargetEntity')
    async getTargetEntityId(@Body('workflow_target_entity_id') id: number): Promise<Target[]> {
        return this.targetService.getTargetEntityId(id);
    }

}
