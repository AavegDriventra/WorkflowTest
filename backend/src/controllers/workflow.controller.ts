import { Body, Controller , Post , Get} from "@nestjs/common";
import { Workflow } from "src/schema/workflow.schema";
import { WorkFlowService } from "src/services/workflow.service";

@Controller('workflow')
export class WorkflowController {
    constructor(private readonly workflowService: WorkFlowService) {}

    @Post('/add')
    createWorkflow(@Body() workflowData : Workflow) {
        return this.workflowService.createWorkflow(workflowData);
    }



    @Get('/all')
    getAllWorkflow(){
        return this.workflowService.getAllWorkflow();
    }
}