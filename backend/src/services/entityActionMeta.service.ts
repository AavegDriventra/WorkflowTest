import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionEntityMeta } from 'src/schema/actionEntityMeta.schema';


@Injectable()
export class ActionEntityMetaService {
  constructor(
    @InjectRepository(ActionEntityMeta)
    private readonly actionEntityMetaServiceRepository: Repository<ActionEntityMeta>,
  ) {}

  async createAction(actionEntityMetaData:ActionEntityMeta ): Promise<ActionEntityMeta> {
    const actionEntityMeta = this.actionEntityMetaServiceRepository.create(actionEntityMetaData);
    return await this.actionEntityMetaServiceRepository.save(actionEntityMeta);
  }

  async getAllActions(): Promise<ActionEntityMeta[]> {
    return await this.actionEntityMetaServiceRepository.find();
  }
}
