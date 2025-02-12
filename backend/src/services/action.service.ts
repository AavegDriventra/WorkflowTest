import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Action } from 'src/schema/action.schema';


@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(Action)
    private readonly actionRepository: Repository<Action>,
  ) {}

  async createAction(actionData: Action): Promise<Action> {
    const action = this.actionRepository.create(actionData);
    return await this.actionRepository.save(action);
  }

  async getAllActions(): Promise<Action[]> {
    return await this.actionRepository.find();
  }

  async getActionById(entity_id: number): Promise<Action[]> {
          return await this.actionRepository.find({ where: { entity_id } ,
          });
      }
}
