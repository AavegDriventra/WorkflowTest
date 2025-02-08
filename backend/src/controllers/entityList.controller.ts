import { Body, Controller, Post  , Get} from "@nestjs/common";
import { EntityList } from "src/schema/entityList.schema";
import { EntityListService } from "src/services/entityList.service";


@Controller('entitylist')
export class EntityListController {

    constructor(private readonly entityService: EntityListService
    ) {}

    
    @Post('add')
    addEntity(@Body() data : EntityList){
        return this.entityService.addEntity(data);
    }

    @Get('all')
    getEntity(){
        return this.entityService.getAllEntity();
    }

}
