import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ActionEvent } from "src/schema/actionEvent.schema";
import { In, Repository } from "typeorm";

@Injectable()
export class ActionEventService {
    constructor(
        @InjectRepository(ActionEvent)
        private readonly actionEventRepository: Repository<ActionEvent>,
    ){}

    async createActionEvent(actionEventData : ActionEvent) : Promise<ActionEvent>{
        const data = this.actionEventRepository.create(actionEventData);
        return await this.actionEventRepository.save(data);
    }

    async getAllActionEvent() : Promise<ActionEvent []>{

        // await this.actionEventRepository.delete({});
        // await this.actionEventRepository.query('ALTER TABLE target AUTO_INCREMENT = 1');

        return await this.actionEventRepository.find();
    }


    async getActionEventsByIds(id: number): Promise<ActionEvent[]> {
        return await this.actionEventRepository.find({
            where: { action_component_id: id },
        });
    }
}