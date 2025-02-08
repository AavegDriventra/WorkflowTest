import { Workflow } from './../schema/workflow.schema';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class WorkFlowService {
    constructor(
        @InjectRepository(Workflow)
        private readonly workflowRepository: Repository<Workflow>,

    ){}

    async createWorkflow( data : any):Promise<Workflow[]>{
        const WorkflowData = this.workflowRepository.create(data)
        return await this.workflowRepository.save(WorkflowData)
    }

    async getAllWorkflow():Promise<Workflow[]>{
        return await this.workflowRepository.find()
    }
}